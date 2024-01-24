import gql from "graphql-tag";
import { FormType, DataType, PageView, Action } from "../src/utils/types";
import { dbClient } from "../config/model";
export class Event {
    async getCreateData(data) {
        const form = new FormType('', 'Submit', [
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
        ]);
        const view = new PageView({
            id: "",
            layout: "Grid",
            sections: [form],
            children: []
        });
        return view;
    }
    async getListData(filters) {
        const upcomingView = {
            id: 'upcoming',
            sections: await this.getEvents('upcoming')
        };
        const markedView = {
            id: 'marked',
            sections: await this.getEvents('marked')
        };
        const todayView = {
            id: 'today',
            sections: await this.getEvents('today')
        };
        const view = new PageView({
            id: "",
            layout: "Grid",
            sections: [upcomingView, markedView, todayView],
            children: []
        });
        return view;
    }
    async getSingleData(id) {
        const query = gql `{
            event(id: ${id})
        }`;
        const data = await dbClient.get(query);
        const dataType = {
            items: {
                header: [
                    { label: data.name }
                ],
                center: [
                    {
                        label: data.startAt
                    },
                    { label: "to" },
                    { label: data.endAt }
                ],
                footer: [
                    data.sessions.filter((session) => {
                        this.getSessionDataView(session);
                    }),
                    {
                        action: new Action({
                            event: 'Modal',
                            args: await this.createSessionDataView(data.id)
                        })
                    }
                ]
            },
        };
        const view = new PageView({
            sections: [
                dataType
            ],
            id: "",
            layout: "Grid",
            children: []
        });
        return view;
    }
    async getEvents(eventStatus) {
        let query;
        switch (eventStatus) {
            case 'upcoming':
                query = gql `{
                events (startAt {
                    gt: {${new Date()}}})
                }`;
                break;
            case 'marked':
                query = gql `{
                events (startAt {
                    lt: {
                    ${new Date()}
                    }
                    })
                }`;
                break;
            case 'today':
                query = gql `{
                events (startAt ${new Date()})
            }`;
                break;
        }
        const data = await dbClient.get(query);
        const dataType = new DataType({
            items: {
                header: [
                    { label: data.name }
                ],
                center: [
                    { label: data.startAt },
                    { label: data.endAt }
                ]
            }
        });
        return dataType;
    }
    async getSessionDataView(session) {
        let startTime = session.startAt;
        let timeRemaining;
        let timeElapse;
        const dataType = new DataType({
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
                    {}
                ],
            },
            calculateTime() {
                const currentTime = new Date().getTime();
                const elapsedTime = currentTime - startTime;
                const totalEventDuration = 3 * 60 * 60 * 1000;
                const remainingTime = totalEventDuration - elapsedTime;
                const elapsedHours = Math.floor(elapsedTime / (1000 * 60 * 60));
                const elapsedMinutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
                const elapsedSeconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
                const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
                const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                timeElapse = `Time Elapsed: ${elapsedHours}h ${elapsedMinutes}m ${elapsedSeconds}s`;
                timeRemaining = `Time Remaining: ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;
            },
            computeAction() {
                setInterval(this.calculateTime, 1000);
            }
        });
        return dataType;
    }
    async createSessionDataView(eventId) {
        const membersQuery = gql `{
            member {
                firstName
                lastName
                avatar
            }
        }`;
        const groupsQuery = gql `{
            member {
                name
                members
                admins
            }
        }`;
        const groupOptions = await dbClient.get(groupsQuery);
        const memberOptions = await dbClient.get(membersQuery);
        const options = [
            {
                label: 'members',
                data: memberOptions
            },
            {
                label: 'groups',
                data: groupOptions
            }
        ];
        const question = {
            title: "",
            index: 2,
            actions: {
                submit: new Action({
                    event(filledForm) {
                        const session = {
                            eventId: eventId,
                            name: filledForm.name,
                            startAt: filledForm.startAt,
                            endAt: filledForm.endAt,
                            anchor: filledForm.anchor,
                            content: filledForm.content
                        };
                        dbClient.post(gql `{session(${session}) }`);
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
                    name: 'startAt',
                    answer: '',
                    inputType: 'schedule'
                },
                {
                    question: 'end',
                    name: 'endAt',
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
        };
        const view = {
            id: "",
            layout: "Grid",
            sections: [question],
            size: "",
            navType: "center"
        };
        return view;
    }
}
