import gql from "graphql-tag";
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm"
import { DataType, PageView, QuestionType, View } from "../src/utils/types";
import { IDataView } from "./IDataView";
import { dbClient } from "../config/model";
import { Member } from "./Member";
import { Group } from "./Group";

@Entity()
export class Message implements IDataView {
    @PrimaryGeneratedColumn() id!: number
    @Column() title!: string
    @Column() content!: string
    @Column() address!: ''
    @CreateDateColumn() created_at!: Date
    @UpdateDateColumn() updated_at!: Date;

    

    @UpdateDateColumn()
    schedule!: Date
    //@Column({ type: 'timestamptz' }) lastTime!: Date
    @Column() thumbnail!: string
    avatar!: string

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
        
        const members: Member[] = await dbClient.get(membersQuery)
        const groups: Group[] = await dbClient.get(groupsQuery)

        const options = [
            {
                label: 'groups',
                children: groups.map((group) => {
                    return {
                        label: group.name,
                        id: group.id
                    }
                }),
            },
            {
                label: 'members',
                children: members.map((member) => {
                    return {
                        label: `${member.firstName} ${member.lastName}`,
                        id: member.id
                    }
                }),          
            }
        ]
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
                }
            ]
        }

        const view: PageView = {
            sections: [form],
            id: "",
            layout: "Grid",
            children: []
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
        const data = await dbClient.get(query)
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
        const view: PageView = {
            sections: [dataType],
            id: "",
            layout: "Grid",
            children: []
        }
        return view
    }
    
}