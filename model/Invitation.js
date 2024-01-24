import gql from "graphql-tag";
import { Action, DataType, PageView } from "../src/utils/types";
import { dbClient } from "../config/model";
import { useUser } from "../src/utils/useUser";
import EFileParse from "../src/components/EFileParse.vue";
import { Mailer } from "@edifiles/services";
export class Invitation {
    constructor() {
        this.id = "Invitation";
    }
    async getCreateData(userId) {
        const membersQuery = gql `member {
            firstName
            lastName
            avatar
        }`;
        const groupsQuery = gql `group {
            name
            members
            admins
        }`;
        const eventQuery = gql `event {
            name
            startAt
            status
        }`;
        const members = await dbClient.get(membersQuery);
        const groups = await dbClient.get(groupsQuery);
        const events = await dbClient.get(eventQuery);
        const senderOptions = [
            {
                label: 'groups',
                children: groups.map((group) => {
                    return {
                        label: group.name,
                        id: group.id
                    };
                }),
            },
            {
                label: 'members',
                children: members.map((member) => {
                    return {
                        label: member.name,
                        id: member.id
                    };
                }),
            }
        ];
        const contactView = {
            sections: [{
                    VComponent: EFileParse,
                    props: useUser
                }],
            id: "",
            layout: "Grid",
            size: "",
            navType: "top"
        };
        const form = {
            title: "",
            index: 0,
            actions: {
                submit: new Action({
                    label: 'send now',
                    event(filledForm) {
                        const email = {
                            name: filledForm.title,
                            subject: "",
                            text: "",
                            templateKey: filledForm.templateKey,
                            html: "",
                            attachments: [],
                            inline_images: [],
                            headers: [],
                            messenger: filledForm.messenger,
                            body: filledForm.content,
                            date: new Date()
                        };
                        const invitation = {
                            id: `${userId}${new Date()}`,
                            eventId: filledForm.event.id,
                            content: filledForm.content,
                            sender: filledForm.sender,
                            schedule: filledForm.schedule,
                            createdAt: filledForm.createdAt
                        };
                        const invitees = useUser().users.map(user => {
                            const obj = user;
                            obj.invitationId = invitation.id;
                            return obj;
                        });
                        new Mailer().sendEmail(email);
                        const invitationQuery = gql `{
                            invitation(${invitation})
                        }
                        `;
                        const inviteesQuery = gql `{
                            invitation(${invitees})
                        }
                        `;
                        dbClient.post(invitationQuery);
                        dbClient.post(inviteesQuery);
                    }
                }),
                sendLater: new Action({
                    label: "send later",
                    event(filledForm) {
                        const email = {
                            name: filledForm.title,
                            subject: "",
                            text: "",
                            templateKey: filledForm.templateKey,
                            html: "",
                            attachments: [],
                            inline_images: [],
                            headers: [],
                            messenger: filledForm.messenger,
                            sendAt: filledForm.schedule,
                            body: filledForm.content
                        };
                        new Mailer().sendEmail(email);
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
                    options: senderOptions,
                    name: 'senderId'
                },
                {
                    question: 'messenger',
                    answer: '',
                    options: [
                        'sms',
                        'email',
                        'notification'
                    ],
                    name: 'messenger'
                },
                {
                    question: 'content',
                    answer: '',
                    inputType: 'textarea',
                    name: 'content'
                },
                {
                    question: 'send to',
                    answer: '',
                    name: 'sendOption',
                    options: [
                        'All',
                        senderOptions,
                        groups,
                        'First timers',
                    ],
                    action: new Action({
                        label: 'Import Contacts',
                        event: 'Modal',
                        args: contactView,
                        onResult() { },
                        onError() { }
                    })
                },
                {
                    question: 'event',
                    answer: '',
                    options: events,
                    name: 'event'
                },
                {
                    question: 'schedule',
                    answer: '',
                    inputType: 'schedule',
                    name: 'schedule'
                },
            ],
        };
        const view = new PageView({
            sections: [form],
            id: "",
            layout: "Grid",
            children: []
        });
        return view;
    }
    async getListData(senderUserId, senderGroupId, ...recipientIds) {
        let query;
        if (senderUserId) {
            query = gql `message (sender_user_id: ${senderUserId})`;
        }
        else if (senderGroupId) {
            query = gql `message (sender_group_id: ${senderGroupId})`;
        }
        if (recipientIds) {
            query = gql `message (recipient_ids: ${recipientIds})`;
        }
        const data = await dbClient.get(query);
        const dataType = new DataType({
            actionOverlay: data.actionPoint,
            items: {
                header: [
                    {
                        label: data.title
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
        const view = new PageView({
            sections: [dataType],
            id: "",
            layout: "Grid",
            children: []
        });
        return view;
    }
    async getSingleData(senderUserId, senderGroupId, ...recipientIds) {
        let query;
        if (senderUserId) {
            query = gql `message (sender_user_id: ${senderUserId})`;
        }
        else if (senderGroupId) {
            query = gql `message (sender_group_id: ${senderGroupId})`;
        }
        if (recipientIds) {
            query = gql `message (recipient_ids: ${recipientIds})`;
        }
        const data = await dbClient.get('', query);
        const dataType = new DataType({
            actionOverlay: data.actionPoint,
            items: {
                header: [
                    {
                        label: data.title
                    },
                    {
                        label: data.createdAt
                    },
                    {
                        label: data.sentAt
                    }
                ],
                center: [
                    {
                        label: data.content
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
