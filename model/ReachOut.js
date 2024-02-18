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
import { Action, DataType } from "../src/utils/types";
import { dbClient } from "../config/model";
import { RestClient, Callback } from "@edifiles/services";
import { config } from "../public/config";
import { Member } from "./Member";
import { Entity, Column, ManyToOne } from "typeorm";
let ReachOut = class ReachOut {
    constructor() {
        this.id = 'reachouts';
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
            id: "",
            title: "",
            index: 0,
            compute(filledForm) {
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
                return { email };
            },
            actions: {
                submit: new Action({
                    label: 'schedule',
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
                        schedule.fetch(config.backEndApi.requests.schedule(filledForm.sendOption.params(filledForm.sendOption.answer), filledForm.messageType.params(email)));
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
                    options: options,
                    name: 'senderId'
                },
                {
                    question: 'message type',
                    options: [
                        {
                            label: 'sms',
                            params: config.api.Infobip.request.sms
                        },
                        {
                            label: 'email',
                            params: config.api.ListMonk.requests.campaign
                        },
                        'notification'
                    ],
                    name: 'message_type'
                },
                {
                    question: 'content',
                    inputType: 'textarea',
                    name: 'content'
                },
                {
                    question: 'filter recipients by',
                    options: [
                        {
                            label: 'Attendance',
                            inputType: 'number',
                            params: (attendance) => {
                                return gql `{
                                    serviceScore(total_attendance: ${attendance})
                                }`;
                            }
                        },
                        {
                            label: 'Birthday',
                            inputType: 'date',
                            params: (date) => {
                                return gql `{
                                    user(date_of_birth: ${date})
                                }`;
                            }
                        },
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
        const createReachOut = new Action({
            label: 'Create',
            event: 'Route',
            args: {
                name: 'categories',
                params: {
                    categories: ['create']
                }
            },
        });
        let data;
        try {
            data = await new RestClient(config.api.ListMonk).get('/campaigns');
        }
        catch (error) {
            console.log(error);
        }
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
            sections: [createReachOut,
                dataType
            ],
            id: "",
            layout: "Grid",
            children: []
        };
        return view;
    }
};
__decorate([
    Column(),
    __metadata("design:type", String)
], ReachOut.prototype, "title", void 0);
__decorate([
    ManyToOne(type => Member),
    __metadata("design:type", Object)
], ReachOut.prototype, "sender", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ReachOut.prototype, "message_type", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ReachOut.prototype, "content", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ReachOut.prototype, "send_option", void 0);
ReachOut = __decorate([
    Entity(),
    __metadata("design:paramtypes", [])
], ReachOut);
export { ReachOut };
