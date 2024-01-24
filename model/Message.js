import gql from "graphql-tag";
import { DataType } from "../src/utils/types";
import { dbClient } from "../config/model";
export class Message {
    constructor() {
        this.id = "message";
    }
    async getCreateData() {
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
        const members = await dbClient.get('', membersQuery);
        const groups = await dbClient.get('', groupsQuery);
        const options = [
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
        const form = {
            title: "",
            index: 0,
            actions: {},
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
                    question: 'recipients',
                    answer: '',
                    options: options,
                    name: 'recipientIds'
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
                }
            ]
        };
        const view = {
            sections: [form],
            id: "",
            layout: "Grid",
            children: []
        };
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
        const data = await dbClient.get('', query);
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
