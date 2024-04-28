import gql from "graphql-tag";
import { Action, DataType, OptionsType, PageView, QuestionType, View } from "../src/utils/types";
import { IDataView } from "./IDataView";
import { dbClient } from "../config/model";
import { useUser } from "../src/utils/useUser";
import EFileParse from "../src/components/EFileParse.vue";
import { EmailType, Mailer } from "@edifiles/services";
import { Member } from "./Member";

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, Relation } from 'typeorm';
import { Event } from './Event';  // Import the Event and Member classes
import { Group } from "./Group";

@Entity()
export class Invitation implements IDataView {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Event, event => event.invitations)
    event!: Relation<Event>;

    @Column()
    content!: string;

    @ManyToOne(() => Member, member => member.sentInvitations)
    sender!: Relation<Member>;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @ManyToMany(() => Member)
    @JoinTable()
    recipients: Relation<Member[]> = [];

    @Column({ type: 'timestamp' })
    schedule!: Date;

    async getCreateData(userId: string) {
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
        
        const members: Member[] = await dbClient.get(membersQuery)
        const groups: Group[] = await dbClient.get(groupsQuery)
        const events: Event[] = await dbClient.get(eventQuery)

        const groupOption =
            {
                label: 'groups',
                children: groups.map((group) => {
                    return {
                        label: group.name,
                        id: group.id
                    }
                }),
            }
        const memberOption = {
                label: 'members',
                children: members.map((member) => {
                    return {
                        label: `${member.firstName} ${member.lastName}`,
                        id: member.id
                    }
                }),          
            }

        const eventOption = {
            label: 'events',
            children: events.map((event) => {
                return {
                    label: event.name,
                    id: event.id
                }
            }),          
        }
        

        /*const groupFilters: Filters = {
            index: "",
            rangeList: [{
                title: ''
            }],
            checks: [
                {
                    attribute: '',
                    values: groupOptions.filter((group)=>{
                        return {label: group.name}
                    })
                }
            ]
        }*/

        const contactView: View = {
            sections: [{
                VComponent: EFileParse,
                props: useUser
            }],
            id: "",
            layout: "Grid",
            size: "",
            navType: "top"
        }
        const form: QuestionType = {
            title: "",
            index: 0,
            id: '',
            sections: [],
            actions: {
                submit: new Action({
                    label: 'send now',
                    event(filledForm: any) {
                        const email: EmailType = {
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
                        }

                        const invitation = {
                            id: `${userId}${new Date()}`,
                            eventId: filledForm.event.id,
                            content: filledForm.content,
                            sender: filledForm.sender,
                            schedule: filledForm.schedule,
                            createdAt: filledForm.createdAt
                        }

                        const invitees = useUser().users.map(user => {
                            const obj = user
                            obj.id = invitation.id
                            return obj
                        })
                        new Mailer().sendEmail(email)

                        const invitationQuery = gql`{
                            invitation(${invitation})
                        }
                        `
                        const inviteesQuery = gql`{
                            invitation(${invitees})
                        }
                        `
                        dbClient.post(invitationQuery)
                        dbClient.post(inviteesQuery)
                    }
                }),
                sendLater: new Action({
                    label: "send later",
                    event(filledForm: any) {
                        const email: EmailType = {
                            name: filledForm.title,
                            subject: "",
                            text: "",
                            templateKey: filledForm.templateKey,
                            html: "",
                            attachments: [],
                            inline_images: [],
                            headers: [],
                            messenger: filledForm.messenger,
                            date: filledForm.schedule,
                            body: filledForm.content
                        }
                        new Mailer().sendEmail(email)
                        /*const mailResource = new ListMonk().campaign(email)
                       const scheduler: Scheduler = new Scheduler(config.backURL)
                       scheduler.post(mailResource)*/
                    }
                })
            },
            content: [
                {
                    question: 'title',
                    inputType: 'text',
                    name: 'title'
                },
                {
                    question: 'sender',
                    options: [
                        groupOption,
                        memberOption
                    ],
                    name: 'senderId'
                },
                {
                    question: 'messenger',
                    options: [
                        'sms',
                        'email',
                        'notification'
                    ],
                    name: 'messenger'
                },
                {
                    question: 'content',
                    inputType: 'textarea',
                    name: 'content'
                },
                {
                    question: 'send to',
                    name: 'sendOption',
                    options: [
                        'All',
                        groupOption,
                        memberOption,
                        'First timers',
                    ],
                    action: new Action({
                        label: 'Import Contacts',
                        event: 'Modal',
                        args: contactView,
                        onResult() {},
                        onError() {}
                    })
                },
                {
                    question: 'event',
                    options: [eventOption],
                    name: 'event'
                },
                {
                    question: 'schedule',
                    inputType: 'schedule',
                    name: 'schedule'
                },
            ],
        }

        const view: PageView = new PageView({
            sections: [form],
            id: "",
            layout: "Grid",
            children: []
        })
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
            id: '',
            sections: [],
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
        })
        const view: PageView = new PageView({
            sections: [dataType],
            id: "",
            layout: "Grid",
            children: []
        })
        return view
    }
    
    async getSingleData(senderUserId?: string, senderGroupId?: string, ...recipientIds: string[]) {
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
            id: '',
            sections: [],
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