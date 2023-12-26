import gql from "graphql-tag";
import { FormType, DataType, PageView, QuestionType, Action, View } from "../src/utils/types";
import { IDataView } from "./IDataView";
import { dbClient } from "../config/model";
export class Event implements IDataView {
    id: string;
    async getCreateData(data?: any) {
        const form: FormType = new FormType('', 'Submit', [
            {
                title: '',
                index: 1,
                actions: {},
                content: [
                    {
                        question: 'name of event',
                        name: 'name',
                        answer: '',
                        inputType: 'text'
                    },
                    {
                        question: 'start',
                        name: 'startAt',
                        answer: '',
                        inputType: 'schedule',
                    },
                    {
                        question: 'end',
                        name: 'endAt',
                        answer: '',
                        inputType: 'date'
                    },
                ]
            },
        ])
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

        return {upcomingView, markedView, todayView}
    }
    async getSingleData(id: string) {
        const query = gql`{
            event(id: ${id})
        }`
        const data = await dbClient.get('', query)
        const dataType: DataType = {
          items: {
              header: [
              {label: data.name}
              ],
              center: [
                  {
                      label: data.startAt
                  },
                  {label: "to"},
                  {label: data.endAt}
              ],
              footer: [
                data.sessions.filter((session)=> {
                    this.getSessionDataView(session)
                }),
                {
                    action:  {
                        event: 'Modal',
                        args: await this.createSessionDataView(data.id),
                        onResult: [],
                        onError: []
                    }
                }
              ]
          },
        }

        const view: PageView = {
            sections: [
                dataType
            ],
            id: "",
            layout: "Grid",
            children: []
        }
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
        
        const data = await dbClient.get("", query)

        const dataType: DataType = new DataType({
            items: {
                header: [
                    {label: data.name}
                ],
                center: [
                    {label: data.startAt},
                    {label: data.endAt}
                ]
            }
        })
        return dataType
    }


    async getSessionDataView(session) {
        let startTime = session.startAt
        let timeRemaining
        let timeElapse
        const dataType: DataType = new DataType({
            items: {
                header: [
                    {
                        label: session.name
                    },
                    {
                        label: session.author.name
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
        
                const elapsedTime = currentTime - startTime;
                
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
        
        const groupOptions = await dbClient.get('member', groupsQuery)
        const memberOptions = await dbClient.get('member', membersQuery)
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
            actions: {},
            content: [
                {
                    question: 'name',
                    name: 'name',
                    answer: '',
                    inputType: 'text'
                },
                {
                    question: 'start',
                    name: 'startAt',
                    answer: '',
                    inputType: 'schedule'
                },
                {
                    question: 'end',
                    name: '',
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