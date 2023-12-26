import gql from "graphql-tag";
import { Action, DataType, Filters, QuestionType, View } from "../src/utils/types";
import { IDataView } from "./IDataView";
import { dbClient } from "../config/model";

export class Invitation implements IDataView {
    async getCreateData() {
        const membersQuery = gql `member {
            firstName
            lastName
            avatar
        }`

        const groupsQuery = gql `group {
            name
            members
            admins
        }`

        const eventQuery = gql `event {
            name
            startAt
            status
        }`
        
        const memberOptions = await dbClient.get('', membersQuery)
        const groupOptions = await dbClient.get('', groupsQuery)
        const eventOptions = await dbClient.get('', eventQuery)

        const senderOptions = {
            groups: groupOptions,
            members: memberOptions,
        }

        const groupFilters: Filters = {
            index: "",
            rangeList: [{
                title: ''
            }],
            checks: [
                {
                    attribute: '',
                    values: groupOptions.filter((group)=>{
                        return {label: group.name.firstName}
                    })
                }
            ]
        }

        const contactView

        const form: QuestionType = {
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
                    options: senderOptions,
                    name: 'senderId'
                },
                {
                    question: 'recipients',
                    answer: '',
                    options: senderOptions,
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
                            label: 'Import Contacts',
                            event: 'Modal',
                            args: contactView,
                            onResult: [],
                            onError: []
                        })
                    ],
                    name: 'sendOption'
                },
                {
                    question: 'event',
                    answer: '',
                    options: eventOptions,
                    name: 'event'
                }
            ]
        }

        const view: View = {
            sections: [form],
            id: "",
            layout: "Grid",
            size: "",
            navType: "top"
        }
        return view
    }
    async getListData(senderUserId?: string, senderGroupId?: string, ...recipientIds: string[]) {
        let query
        if (senderUserId) {
            query = gql`message (sender_user_id: ${senderUserId})`
        }
        else if (senderGroupId) {
            query = gql`message (sender_group_id: ${senderGroupId})`
        }
        if (recipientIds) {
            query = gql`message (recipient_ids: ${recipientIds})`
        }
        const data = await dbClient.get('', query)
        const dataType: DataType = new DataType({
            actionOverlay: data.actionPoint, //the actionPoint takes us to take action on the message
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
        })
        const view: View = {
            sections: [dataType],
            id: "",
            layout: "Grid",
            size: "",
            navType: "top"
        }
        return view
    }
    getSingleData(id: string) {
    }
    
}