import gql from "graphql-tag";
import { DataType, QuestionType, View } from "../src/utils/types";
import { IDataView } from "./IDataView";
import { dbClient } from "../config/model";

export class ReachOut implements IDataView {
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
        
        const memberOptions = await dbClient.get('', membersQuery)
        const groupOptions = await dbClient.get('', groupsQuery)

        const options = {
            groups: groupOptions,
            members: memberOptions,
        }
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
                        'Attendance',
                        'Schedule'
                    ],
                    name: 'sendOption'
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