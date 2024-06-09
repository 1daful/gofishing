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
<<<<<<< HEAD
import { Action, DataType, View } from "../src/utils/types";
=======
import { Action, DataType, PageView } from "../src/utils/types";
>>>>>>> master
import { dbClient } from "../config/model";
import { RestClient, Callback } from "@edifiles/services";
import { config } from "../public/config";
import { Member } from "./Member";
import { Entity, Column, ManyToOne } from "typeorm";
let ReachOut = class ReachOut {
<<<<<<< HEAD
    constructor() {
        this.id = 'reachouts';
    }
    async getCreateData() {
        var _a, _b;
=======
    id = 'reachouts';
    title;
    sender;
    message_type;
    content;
    send_option;
    constructor() {
    }
    async create() {
>>>>>>> master
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
<<<<<<< HEAD
        const members = (_a = (await dbClient.get(membersQuery)).data) === null || _a === void 0 ? void 0 : _a.data;
        const groups = (_b = (await dbClient.get(groupsQuery)).data) === null || _b === void 0 ? void 0 : _b.data;
        const options = [
            {
                label: 'groups',
                children: groups === null || groups === void 0 ? void 0 : groups.map((group) => {
=======
        const members = (await dbClient.get(membersQuery)).data?.data;
        const groups = (await dbClient.get(groupsQuery)).data?.data;
        const options = [
            {
                label: 'groups',
                children: groups?.map((group) => {
>>>>>>> master
                    return {
                        label: group.name,
                        id: group.id,
                    };
                }),
            },
            {
                label: 'members',
<<<<<<< HEAD
                children: members === null || members === void 0 ? void 0 : members.map((member) => {
=======
                children: members?.map((member) => {
>>>>>>> master
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
            sections: [],
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
<<<<<<< HEAD
        const view = new View({
            sections: [form],
            id: "",
            size: '',
            navType: 'center',
=======
        const view = new PageView({
            sections: [form],
            id: "",
            children: [],
>>>>>>> master
            layout: "Grid"
        });
        return view;
    }
    async getListData(senderUserId, senderGroupId, ...recipientIds) {
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
        let { data, error } = await new RestClient(config.api.ListMonk).get('/campaigns');
        let dataType = new DataType({
            sections: [],
            id: '',
            items: {
                header: undefined,
                center: undefined,
                footer: undefined,
                left: undefined,
                right: undefined
            }
        });
        if (data) {
            dataType = new DataType({
                sections: [],
                id: '',
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
        }
<<<<<<< HEAD
        const view = new View({
=======
        const view = new PageView({
>>>>>>> master
            sections: [
                createReachOut,
                dataType
            ],
            id: "",
            layout: "Grid",
<<<<<<< HEAD
            size: '',
            navType: 'center'
=======
            children: []
>>>>>>> master
        });
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
