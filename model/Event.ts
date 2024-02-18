import gql from "graphql-tag";
import { FormType, DataType, QuestionType, Action, View, DataList } from "../src/utils/types";
import { IDataView } from "./IDataView";
import { addModel, auth, dbClient } from "../config/model";
import { QueryFilter, QueryType } from "@edifiles/services";
import { Session } from "./Session";
import { Invitation } from "./Invitation";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne, Relation } from 'typeorm';
import { Attendance } from "./Attendance";
import { Service } from "./Service";

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

    async getCreateData(data?: any) {
        const form: QuestionType = new QuestionType(
            {
                title: '',
                id: '',
                index: 1,
                actions: {
                    submit: new Action({
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
                    })
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
                        inputType: 'date'
                    },
                    {
                        question: 'select service',
                        inputType: 'date',
                        name: 'service_id'
                    }
                ]
            })
        const view: View = new View({
            id: "",
            layout: "Grid",
            sections: [form],
            size: '',
            navType: 'center'
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
        const upcomingView = {
            id: 'upcoming',
            sections: await this.getEvents('upcoming', query)
        }
          
        const markedView = {
            id: 'marked',
            sections: await this.getEvents('marked', query)
        }
          
        const todayView = {
            id: 'today',
            sections: await this.getEvents('today', query)
        }
        const view: View = new View({
            id: "",
            layout: "Grid",
            sections: [createEvent, upcomingView, markedView, todayView],
            size: '',
            navType: 'center'
        })
        return view
    }
    async getSingleData(id: string) {
        const query = gql`{
            event(id: ${id})
        }`
        const data: Event = await dbClient.get(query)
        const dataType: DataType = {
          items: {
              header: [
              {label: data.name}
              ],
              center: [
                {
                    label: data.start_at.toUTCString()
                },
                  {label: "to"},
                  {label: data.end_at.toUTCString()}
              ],
              footer: [
                data.sessions.filter((session)=> {
                    this.getSessionDataView(session)
                }),
                {
                    action:  new Action({
                        event: 'Modal',
                        args: await this.createSessionDataView(data.id)
                    })
                }
              ]
          },
        }

        const view: View = new View({
            sections: [
                dataType
            ],
            id: "",
            layout: "Grid",
            size: '',
            navType: 'center'
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
            
            case 'today':
                eventQuery.filters?.push({
                    op: 'eq',
                    col: 'start_at',
                    val: new Date().toUTCString()
                })
            break
        }
        
        const data = await dbClient.get(eventQuery)

        const dataList: DataList = new DataList({
            items: []
        })

        dataList.items = data.data.map((dat) => {
            return new DataType({
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


    async getSessionDataView(session: Session) {
        let startTime = session.start_at
        let timeRemaining
        let timeElapse
        const dataType: DataType = new DataType({
            items: {
                header: [
                    {
                        label: session.name
                    },
                    {
                        label: session.author.firstName
                    },
                    {
                        label: session.author.lastName
                    },
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
            calculateTime() {
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
            },
            computeAction (){
                setInterval(this.calculateTime, 1000);
            }
        })

        return dataType
    }

    async createSessionDataView(eventId: string) {
        const membersQuery = gql `{
            member {
                firstName
                lastName
                avatar
            }
        }`

        const groupsQuery = gql `{
            member {
                name
                members
                admins
            }
        }`
        
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

        const question: QuestionType = {
            title: "",
            id: '',
            index: 2,
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
                        }
                        dbClient.post(gql`{session(${session}) }`)
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
            ]
        }
        const view: View = {
            id: "",
            layout: "Grid",
            sections: [question],
            size: "",
            navType: "center"
        }

        return view
    }
}