import gql from "graphql-tag";
import { DataType, QuestionType, Action, View, DataList, PageView, Filters } from "../src/utils/types";
import { IDataView } from "./IDataView";
import { addModel, auth, dbClient } from "../config/model";
import { QueryFilter, QueryType } from "@edifiles/services";
import { Session } from "./Session";
import { Invitation } from "./Invitation";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne, Relation } from 'typeorm';
import { Attendance } from "./Attendance";
import { Service } from "./Service";
import { getData } from "./DataView";
import { foreignColumns } from "@edifiles/services/dist/module/utility/Query";

@Entity()
export class Event implements IDataView {

    /*@PrimaryGeneratedColumn('uuid')
    id!: string;*/
    id = 'events'

    @Column({ type: 'timestamp' })
    create_at!: Date;

    @Column({ type: 'timestamp' })
    start_at!: Date;

    @Column({ type: 'timestamp' })
    end_at!: Date;

    @Column()
    name!: string;

    @OneToMany(() => Session, session => session.event)
    sessions!: Relation<Session[]>;

    @OneToMany(() => Invitation, invitation => invitation.event)
    invitations!: Relation<Invitation[]>;

    @OneToMany(() => Attendance, (attendance) => attendance.event)
    attendances!: Relation<Attendance[]>

    @ManyToOne(() => Service, (service) => service.events)
    service!: Relation<Service>

    async create(data?: any) {
        const serviceQuery: QueryType = {
            name: "service",
            data: undefined,
            columns: [
                'name'
            ]
        }
        const options = await dbClient.get(serviceQuery)
        const form: QuestionType = new QuestionType(
            {
                sections: [
                    new Filters({
                        id: '',
                        indexName: '',
                        sections: [],
                        layout: 'Grid',
                        size: '',
                        checks: [
                            {
                                id: '',
                                attribute: "",
                                values: [
                                    'Add to service'
                                ],
                                model: []
                            }
                        ]
                    })
                ],
                title: '',
                id: '',
                index: 1,
                actions: {
                    submit: new Action({
                        label: 'Create event',
                        async event(filledForm: any) {
                            const user = await auth.getUser()
                            filledForm.user_id = user.data.user?.id
                            const query: QueryType = {
                                name: "event",
                                data: filledForm,
                                columns: []
                            }
                            dbClient.post(query)
                        }
                    }),
                },
                content: [
                    {
                        question: 'name of event',
                        name: 'name',
                        inputType: 'text'
                    },
                    {
                        question: 'start',
                        name: "start_at",
                        inputType: 'schedule',
                    },
                    {
                        question: 'end',
                        name: 'end_at',
                        inputType: 'schedule'
                    },
                    {
                        question: 'select service',
                        options,
                        name: 'service_id'
                    }
                ]
            })
        const view: PageView = new PageView({
            id: "",
            layout: "Grid",
            sections: [form],
            children:[]
        })
        return view
    }
    async getListData(query?: QueryType) {
        const createEvent: Action = new Action({
            label: 'Create',
            event: 'Route',
            args: {
                name: 'categories',
                params: {
                    categories: ['create']
                }
            },
        })
        let eventQuery: QueryType = query || {
            name: 'event',
            data: undefined
        }
        
        const upcoming = await this.getEvents('upcomiing', query)
        
        const markedView = await this.getEvents('marked', query)
        const ongoingView = await this.getEvents('ongoing', query)

        const upcomingEvents: DataList = new DataList({
            items: [],

            actions: [
                new Action({
                    label: 'Create',
                    icon: 'add',
                    event: 'Route',
                    viewGuard: true,
                    args: {
                        name: 'categories',
                        params: {
                            categories: ['create']
                        }
                    },
                })
            ]
        })

        const callback = (dat: Event) => {
            return new DataType({
                id: '',
                sections: [],
                items: {
                    header: [
                        {
                            action: new Action({
                                label: 'open',
                                event: 'Route',
                                args: {
                                    name:  'id',
                                    params: {
                                        id: dat.id
                                    }
                                }
                            })
                        },
                        {label: dat.name}
                    ],
                    center: [
                        {label: dat.start_at},
                        {label: dat.end_at}
                    ]
                }
            })
        }
        const upcomingQuery = query || {
            name: 'event',
            data: undefined,
            filters: [{
                op: 'gt',
                col: 'start_at',
                val: new Date().toUTCString()
        }]
        }
        
        const items = await getData('event', callback) as DataType[]
        const t = items[0]
        upcomingEvents.items = items
        console.log('GetDat ', upcomingEvents)
        const view: PageView = new PageView({
            id: "",
            layout: "Grid",
            sections: [createEvent, t, upcomingEvents ],
            children:[]
        })
        return view
    }
    async getSingleData(id: string) {
        const query: QueryType = {
            name: 'event',
            filters: [
                {
                    op: "eq",
                    col: "id",
                    val: id
                }
            ],
            columns: [
                'name', 'start_at', 'end_at', foreignColumns('session', ['name', 'content'])
            ],
            data: undefined
        }
        const items = await dbClient.get(query)
        const data =  items.data[0]
        //const session =  await this.createSessionDataView(data.id)
        const dataType: DataType = new DataType({
               items: {
                    header: [
                        {
                            action: new Action({
                                label: 'Take Attendance',
                                event: 'Route',
                                args: {
                                    path: '/attendance/create',
                                    query: {
                                        filters: data.id
                                    }
                                }
                            }),
                        },
                       { label: data.name }
                   ],
                   center: [
                       {
                           label: data.start_at
                       },
                       { label: "to" },
                       { label: data.end_at },
                       {
                           action: new Action({
                               label: 'Create Session',
                               event: 'Route',
                               args: {
                                   name: 'categories',
                                   params: {
                                       categories: ['createSessionDataView']
                                   },
                                   query: {
                                    filters: data.id
                                   }
                               }
                           })
                       },
                   ],
                   footer: 
                       data.session?.map((session) => {
                           return this.getSessionDataView(session);
                       })
                       /*{
                           action: new Action({
                               label: ''
                               event:  'Route',
                               args: {
                                   name: 'categories',
                                   params: {
                                       categories: ['create']
                                   }
                               }
                           })
                       }*/
                   
               },
               sections: [],
               id: ''
           })

        const view: PageView = new PageView({
            sections: [
                dataType
            ],
            id: "",
            layout: "Grid",
            children:[]
        })
        return view
    }

    async getEvents(eventStatus: string, query?: QueryType) {
        let eventQuery: QueryType = query || {
            name: 'event',
            data: undefined
        }

        switch(eventStatus) {
            case 'upcoming':
                eventQuery.filters?.push({
                    op: 'gt',
                    col: 'start_at',
                    val: new Date().toUTCString()
                })
            break
            
            case 'marked':
                eventQuery.filters?.push({
                    op: 'lt',
                    col: 'start_at',
                    val: new Date().toUTCString()
                })
            break
            
            case 'ongoing':
                eventQuery.filters?.push({
                    op: 'eq',
                    col: 'start_at',
                    val: new Date().toUTCString()
                })
            break
        }
        
        const data = await dbClient.get(eventQuery)

        return data
    }

    getEvent(data: any) {
        const dataList: DataList = new DataList({
            items: []
        })

        dataList.items = data.data.map((dat: Event) => {
            return new DataType({
                id: '',
                sections: [],
                items: {
                    header: [
                        {label: dat.name}
                    ],
                    center: [
                        {label: dat.start_at},
                        {label: dat.end_at}
                    ]
                }
            })
        })
        return dataList
    }

    getSessionDataView(session: Session) {
        let startTime = session.start_at
        let timeRemaining = ""
        let timeElapse = ''
        const dataType: DataType = new DataType({
            items: {
                header: [
                    {
                        label: session.name
                    },
                    /*{
                        label: session.author.firstName
                    },
                    {
                        label: session.author.lastName
                    },*/
                    {
                        label: timeRemaining
                    }
                ],
                center: [
                    {
                        label: session.content
                    }
                ],
                footer: [
                    {
                    }
                ],
            },
            computeAction: () =>{
                setInterval(this.calculateTime, 1000, timeRemaining, startTime);
                //se.tInterval(this.calculateTime.call())
            },
            id: '',
            sections: []
        })

        return dataType
    }

    createSessionDataView = async (eventId: string) => {
        const membersQuery: QueryType = {
            name: 'member',
            data: undefined
        }

        const groupsQuery = {
            name:  'member',
            data: undefined
        }
    
        const groupOptions = await dbClient.get(groupsQuery)
        const memberOptions = await dbClient.get(membersQuery)
        const options = [
            {
                label: 'members',
                data: memberOptions
            },
            {
                label: 'groups',
                data: groupOptions
            }
        ]

        const question: QuestionType = new QuestionType({
            title: "",
            id: '',
            index: 0,
            actions: {
                submit: new Action({
                    event(filledForm: any) {
                        const session = {
                            event_id: eventId,
                            name: filledForm.name,
                            start_at: filledForm.start_at,
                            end_at: filledForm.end_at,
                            anchor: filledForm.anchor,
                            content: filledForm.content
                        };
                        const sessionQuery: QueryType = {
                            name: 'session',
                            data: session
                        }
                        dbClient.post(sessionQuery);
                    }
                })
            },
            content: [
                {
                    question: 'name',
                    name: 'name',
                    inputType: 'text'
                },
                {
                    question: 'start',
                    name: 'start_at',
                    inputType: 'schedule'
                },
                {
                    question: 'end',
                    name: 'end_at',
                    inputType: 'date'
                },
                {
                    question: 'anchor',
                    name: 'anchor',
                    options: options
                },
                {
                    question: 'content',
                    name: 'content',
                    inputType: 'textarea'
                }
            ],
            sections: []
        })
        const view: PageView = {
            id: "",
            layout: "Grid",
            sections: [question],
            children: []
        }

        return view
    }

    calculateTime = (timeRemaining: string, startTime: Date, timeElapse: string) => {
        const currentTime = new Date().getTime(); // Get current time in milliseconds

        const elapsedTime = currentTime - startTime.getTime();
        
        // Total duration of the event in milliseconds (replace with your event's duration)
        const totalEventDuration = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

        const remainingTime = totalEventDuration - elapsedTime;

        // Convert milliseconds to hours, minutes, seconds
        const elapsedHours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const elapsedMinutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const elapsedSeconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

        const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        timeElapse = `Time Elapsed: ${elapsedHours}h ${elapsedMinutes}m ${elapsedSeconds}s`;
        timeRemaining = `Time Remaining: ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;
    }
}