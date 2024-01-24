import gql from "graphql-tag";
import { Action, DataType } from "../src/utils/types";
import { dbClient } from "../config/model";
export class Announcement {
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
        const memberOptions = await dbClient.get('', membersQuery);
        const groupOptions = await dbClient.get('', groupsQuery);
        const options = {
            groups: groupOptions,
            members: memberOptions,
        };
        const groupFilters = {
            index: "",
            rangeList: [{
                    title: ''
                }],
            checks: [
                {
                    attribute: '',
                    values: groupOptions.filter((group) => {
                        return { label: group.name.firstName };
                    })
                }
            ]
        };
        const memberFilters = {
            index: "",
            rangeList: [{
                    title: ''
                }],
            checks: [
                {
                    attribute: 'Members',
                    values: memberOptions.filter((member) => {
                        return { label: member.firstName + ' ' + member.lastName };
                    })
                }
            ]
        };
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
                },
                {
                    question: 'send',
                    answer: '',
                    options: [
                        'All',
                        new Action({
                            label: 'Groups',
                            event: 'Modal',
                            args: groupFilters,
                            onResult: [],
                            onError: []
                        }),
                        'First timers',
                        new Action({
                            label: 'Select contacts',
                            event: 'Modal',
                            args: memberFilters,
                            onResult: [],
                            onError: []
                        }),
                    ],
                    name: 'sendOption'
                }
            ]
        };
        const view = {
            sections: [form],
            id: "",
            layout: "Grid",
            size: "",
            navType: "top"
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
            size: "",
            navType: "top"
        };
        return view;
    }
    getSingleData(id) {
    }
}
