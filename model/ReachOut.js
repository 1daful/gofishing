import gql from "graphql-tag";
import { Action, DataType } from "../src/utils/types";
import { addModel, dbClient } from "../config/model";
import { RestClient, Callback } from "@edifiles/services";
import { config } from "../public/config";
export class ReachOut {
    constructor() {
        this.id = 'reachout';
        addModel(this, undefined, "mainMenu");
    }
    async getCreateData() {
        const membersQuery = gql `{
            member {
                id
                firstName
                lastName
                avatar
            }
        }`;
        const groupsQuery = gql `{
            group {
                id
                name
            }
        }`;
        const members = await dbClient.get(membersQuery);
        const groups = await dbClient.get(groupsQuery);
        const options = [
            {
                label: 'groups',
                children: groups.map((group) => {
                    return {
                        label: group.name,
                        id: group.id,
                    };
                }),
            },
            {
                label: 'members',
                children: members.map((member) => {
                    return {
                        label: `${member.firstName} ${member.lastName}`,
                        id: member.id,
                        avatar: member.avatar
                    };
                }),
            }
        ];
        const form = {
            title: "",
            index: 0,
            actions: {
                submit: new Action({
                    event(filledForm) {
                        const email = {
                            name: filledForm.title,
                            subject: "",
                            text: "",
                            templateKey: "",
                            html: filledForm.content,
                            date: new Date(),
                            attachments: [],
                            inline_images: [],
                            headers: [],
                            messenger: filledForm.messenger,
                            body: filledForm.content
                        };
                        const schedule = new Callback(config.backEndApi);
                        switch (filledForm.sendOption) {
                            case 'attendance':
                                const attendanceQuery = gql `{
                                    serviceScore(totalAttendance: ${filledForm.sendOption})
                                }`;
                                schedule.post(config.backEndApi.requests.schedule(attendanceQuery, config.api.ListMonk.requests.campaign(email)));
                                break;
                            case "Birthday":
                                const BirthdayQuery = gql `{
                                    user(dateOfBirth: ${new Date()})
                                }`;
                                schedule.post(config.backEndApi.requests.schedule(BirthdayQuery, config.api.ListMonk.requests.campaign(email)));
                                break;
                            default:
                                break;
                        }
                    }
                })
            },
            content: [
                {
                    question: 'title',
                    answer: '',
                    inputType: 'text',
                    name: 'title'
                },
                {
                    question: 'sender',
                    answer: '',
                    options: options,
                    name: 'senderId'
                },
                {
                    question: 'action point',
                    answer: '',
                    options: [
                        'sms',
                        'email',
                        'notification'
                    ],
                    name: 'actionPoint'
                },
                {
                    question: 'content',
                    answer: '',
                    inputType: 'textarea',
                    name: 'content'
                },
                {
                    question: 'filter recipients',
                    answer: '',
                    options: [
                        'Attendance',
                        'Birthday',
                        {
                            label: 'Invitees',
                            children: [
                                {
                                    label: 'Before event',
                                    id: 0
                                },
                                {
                                    label: 'After event',
                                    id: 1
                                }
                            ]
                        }
                    ],
                    name: 'sendOption'
                }
            ]
        };
        const view = {
            sections: [form],
            id: "",
            children: [],
            layout: "Grid"
        };
        return view;
    }
    async getListData(senderUserId, senderGroupId, ...recipientIds) {
        let query;
        const data = await new RestClient(config.api.ListMonk).get('/campaigns');
        const dataType = new DataType({
            actionOverlay: data.actionPoint,
            items: {
                header: [
                    {
                        label: data.title
                    }
                ],
                center: [
                    {
                        label: data.content
                    }
                ],
                footer: [
                    {
                        label: data.createdAt
                    },
                    {
                        label: data.sentAt
                    }
                ]
            }
        });
        const view = {
            sections: [dataType],
            id: "",
            layout: "Grid",
            children: []
        };
        return view;
    }
}
