var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import gql from "graphql-tag";
import { Action, DataType, PageView } from "../src/utils/types";
import { dbClient } from "../config/model";
import { useUser } from "../src/utils/useUser";
import EFileParse from "../src/components/EFileParse.vue";
import { Mailer } from "@edifiles/services";
import { Member } from "./Member";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import { Event } from './Event';
let Invitation = class Invitation {
<<<<<<< HEAD
    constructor() {
        this.recipients = [];
    }
    async getCreateData(userId) {
=======
    id;
    event;
    content;
    sender;
    created_at;
    recipients = [];
    schedule;
    async create(userId) {
>>>>>>> master
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
        const groupOption = {
            label: 'groups',
            children: groups.map((group) => {
                return {
                    label: group.name,
                    id: group.id
                };
            }),
        };
        const memberOption = {
            label: 'members',
            children: members.map((member) => {
                return {
                    label: `${member.firstName} ${member.lastName}`,
                    id: member.id
                };
            }),
        };
        const eventOption = {
            label: 'events',
            children: events.map((event) => {
                return {
                    label: event.name,
                    id: event.id
                };
            }),
        };
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
<<<<<<< HEAD
=======
            id: '',
            sections: [],
>>>>>>> master
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
<<<<<<< HEAD
                            obj.invitationId = invitation.id;
=======
                            obj.id = invitation.id;
>>>>>>> master
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
                            date: filledForm.schedule,
                            body: filledForm.content
                        };
                        new Mailer().sendEmail(email);
                    }
                })
            },
            content: [
                {
                    question: 'title',
<<<<<<< HEAD
                    answer: '',
=======
>>>>>>> master
                    inputType: 'text',
                    name: 'title'
                },
                {
                    question: 'sender',
<<<<<<< HEAD
                    answer: '',
=======
>>>>>>> master
                    options: [
                        groupOption,
                        memberOption
                    ],
                    name: 'senderId'
                },
                {
                    question: 'messenger',
<<<<<<< HEAD
                    answer: '',
=======
>>>>>>> master
                    options: [
                        'sms',
                        'email',
                        'notification'
                    ],
                    name: 'messenger'
                },
                {
                    question: 'content',
<<<<<<< HEAD
                    answer: '',
=======
>>>>>>> master
                    inputType: 'textarea',
                    name: 'content'
                },
                {
                    question: 'send to',
<<<<<<< HEAD
                    answer: '',
=======
>>>>>>> master
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
                        onResult() { },
                        onError() { }
                    })
                },
                {
                    question: 'event',
<<<<<<< HEAD
                    answer: '',
=======
>>>>>>> master
                    options: [eventOption],
                    name: 'event'
                },
                {
                    question: 'schedule',
<<<<<<< HEAD
                    answer: '',
=======
>>>>>>> master
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
<<<<<<< HEAD
=======
            id: '',
            sections: [],
>>>>>>> master
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
<<<<<<< HEAD
        const data = await dbClient.get('', query);
        const dataType = new DataType({
            actionOverlay: data.actionPoint,
=======
        const data = await dbClient.get(query);
        const dataType = new DataType({
            actionOverlay: data.actionPoint,
            id: '',
            sections: [],
>>>>>>> master
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
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Invitation.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Event, event => event.invitations),
    __metadata("design:type", Object)
], Invitation.prototype, "event", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Invitation.prototype, "content", void 0);
__decorate([
    ManyToOne(() => Member, member => member.sentInvitations),
    __metadata("design:type", Object)
], Invitation.prototype, "sender", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Invitation.prototype, "created_at", void 0);
__decorate([
    ManyToMany(() => Member),
    JoinTable(),
    __metadata("design:type", Object)
], Invitation.prototype, "recipients", void 0);
__decorate([
    Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Invitation.prototype, "schedule", void 0);
Invitation = __decorate([
    Entity()
], Invitation);
export { Invitation };
