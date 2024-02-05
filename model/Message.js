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
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { DataType } from "../src/utils/types";
import { dbClient } from "../config/model";
let Message = class Message {
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
        const members = await dbClient.get(membersQuery);
        const groups = await dbClient.get(groupsQuery);
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
                        label: `${member.firstName} ${member.lastName}`,
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
        const data = await dbClient.get(query);
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
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Message.prototype, "title", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Message.prototype, "address", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Message.prototype, "created_at", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Message.prototype, "updated_at", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Message.prototype, "schedule", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Message.prototype, "thumbnail", void 0);
Message = __decorate([
    Entity()
], Message);
export { Message };
