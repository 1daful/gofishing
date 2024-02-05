import gql from "graphql-tag";
import { FormType, DataType, PageView, QuestionType, Action, View } from "../src/utils/types";
import { IDataView } from "./IDataView";
import { auth, dbClient } from "../config/model";
import { QueryType } from "@edifiles/services";
import { Session } from "./Session";
import { Invitation } from "./Invitation";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne, Relation } from 'typeorm';
import { Attendance } from "./Attendance";
import { Service } from "./Service";

@Entity()
export class Event implements IDataView {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

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
        const form: FormType = new FormType('', 'Submit', [
            {
                title: '',
                index: 1,
                actions: {
                    submit: new Action({
                        async event(filledForm: any) {
                            const user = await auth.getUser()
                            filledForm.user_id = user.id
                            const query: QueryType = {
                                name: "",
                                data: filledForm,
                                filter: [],
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
                        answer: '',
                        inputType: 'text'
                    },
                    {
                        question: 'start',
                        name: "start_at",
                        answer: '',
                        inputType: 'schedule',
                    },
                    {
                        question: 'end',
                        name: 'end_at',
                        answer: '',
                        inputType: 'date'
                    },
                ]
            },
        ])
        const view: PageView = new PageView({
            id: "",
            layout: "Grid",
            sections: [form],
            children: []
        })
        return view
    }
    async getListData(filters?: any) {
        const upcomingView = {
            id: 'upcoming',
            sections: await this.getEvents('upcoming')
        }
          
        const markedView = {
            id: 'marked',
            sections: await this.getEvents('marked')
        }
          
        const todayView = {
            id: 'today',
            sections: await this.getEvents('today')
        }
        const view: PageView = new PageView({
            id: "",
            layout: "Grid",
            sections: [upcomingView, markedView, todayView],
            children: []
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

        const view: PageView = new PageView({
            sections: [
                dataType
            ],
            id: "",
            layout: "Grid",
            children: []
        })
        return view
    }

    async getEvents(eventStatus: string) {
        let query
        switch(eventStatus) {
            case 'upcoming':
                query = gql `{
                events (startAt {
                    gt: {${new Date()}}})
                }`
            break
            
            case 'marked':
            query = gql`{
                events (startAt {
                    lt: {
                    ${new Date()}
                    }
                    })
                }`
            
            break
            
            case'today':
            query = gql`{
                events (startAt ${new Date()})
            }`
            break
        }
        
        const data = await dbClient.get(query)

        const dataType: DataType = new DataType({
            items: {
                header: [
                    {label: data.name}
                ],
                center: [
                    {label: data.start_at},
                    {label: data.end_at}
                ]
            }
        })
        return dataType
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
                    answer: '',
                    inputType: 'text'
                },
                {
                    question: 'start',
                    name: 'start_at',
                    answer: '',
                    inputType: 'schedule'
                },
                {
                    question: 'end',
                    name: 'end_at',
                    answer: '',
                    inputType: 'date'
                },
                {
                    question: 'anchor',
                    name: 'anchor',
                    answer: '',
                    options: options
                },
                {
                    question: 'content',
                    name: 'content',
                    answer: '',
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