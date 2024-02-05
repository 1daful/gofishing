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
import { dbClient } from "../config/model";
import { Action, DataType, QuestionType } from "../src/utils/types";
import { Share } from "../service/shareSrv";
import EUpload from "../src/components/EUpload.vue";
import { Member } from "./Member";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Event } from './Event';
import { foreignColumns } from "@edifiles/services/dist/module/utility/Query";
let Service = class Service {
    constructor() {
        this.id = 'services';
        this.view = {
            sections: [EUpload],
            id: "videoView",
            layout: "Grid",
            size: "",
            navType: "top"
        };
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
        const groupsQuery = {
            name: "",
            data: undefined,
            filter: [],
            columns: [
                'id', 'name', foreignColumns('member', ['firstName', 'lastName', 'id', 'avatar'])
            ]
        };
        const groups = await dbClient.get(groupsQuery);
        const members = await dbClient.get(membersQuery);
        const form = new QuestionType({
            title: "Create new service",
            id: '',
            index: 1,
            actions: {
                submit: new Action({
                    label: "Submit",
                    event(filledForm) {
                        const service = {
                            name: filledForm.name,
                        };
                        const query = {
                            name: 'service',
                            data: service,
                            filter: [],
                            columns: []
                        };
                        dbClient.post(query);
                    }
                })
            },
            content: [{
                    question: 'name',
                    answer: '',
                    name: 'name',
                    inputType: 'text'
                },
                {
                    question: 'anchors',
                    answer: '',
                    name: 'anchors',
                }]
        });
        const view = {
            id: "createService",
            layout: "Grid",
            sections: [form],
            children: []
        };
        return view;
    }
    async getListData(filters, dataArg) {
        var _a;
        let dataType = {
            items: {
                header: undefined,
                center: undefined,
                footer: undefined,
                left: undefined,
                right: undefined
            }
        };
        let data;
        if (dataArg) {
            data = dataArg;
        }
        else {
            if (filters) {
                data = await dbClient.get(filters);
            }
            else {
                data = await dbClient.get('service');
            }
        }
        if (data) {
            dataType = new DataType({
                items: {
                    header: [
                        {
                            label: data.name
                        },
                        {
                            label: (_a = data.createdAt) === null || _a === void 0 ? void 0 : _a.toString()
                        },
                    ],
                    center: [
                        {
                            component: data.content
                        }
                    ],
                    footer: [
                        {
                            action: new Action({
                                label: 'open',
                                event: 'Route',
                                args: {
                                    name: 'id',
                                    params: {
                                        id: data.id
                                    }
                                },
                            })
                        }
                    ]
                },
                actions: [
                    new Action({
                        label: 'Create',
                        icon: 'add',
                        event: 'Route',
                        args: {
                            name: 'categories',
                            params: {
                                categories: ['create']
                            }
                        },
                    })
                ]
            });
        }
        const view = {
            id: "services",
            layout: "Grid",
            sections: [dataType],
            children: []
        };
        return view;
    }
    async getSingleData(id, filters, argData) {
        const share = new Share();
        let dataType = {
            items: {
                header: undefined,
                center: undefined,
                footer: undefined,
                left: undefined,
                right: undefined
            }
        };
        let data;
        if (argData) {
            data = argData;
        }
        else {
            let query;
            if (id) {
                query = gql `{service (id: ${id})}`;
            }
            else if (filters) {
                query = filters;
            }
            data = await dbClient.get(query);
        }
        let media = {
            url: '',
            description: data.content,
            thumbnail: data.name,
            title: data.name
        };
        const getStatus = () => {
            const now = new Date();
            let status = '';
            if (now >= data.start && now <= data.end) {
                status = 'active';
            }
            if (now > data.end) {
                status = 'ended';
            }
            if (now < data.start) {
                status = 'scheduled';
            }
            return status;
        };
        if (data) {
            dataType = new DataType({
                items: {
                    header: [
                        {
                            label: data.name
                        },
                        {
                            label: data.createdAt
                        },
                        {
                            label: data.timeElapse
                        }
                    ],
                    center: [
                        {
                            component: data.content
                        }
                    ],
                    footer: [
                        {
                            action: new Action({
                                icon: 'videocam',
                                label: 'Add video',
                                event: 'Modal',
                                args: this.view,
                            }),
                        },
                        {
                            action: share.getShare(media),
                        },
                        {
                            action: new Action({
                                label: 'edit',
                                icon: 'edit',
                                event() {
                                },
                            })
                        },
                        {
                            label: getStatus()
                        }
                    ]
                }
            });
        }
        const view = {
            id: data.id,
            layout: "Grid",
            sections: [dataType],
            children: []
        };
        return view;
    }
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Service.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    Column('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], Service.prototype, "anchors", void 0);
__decorate([
    ManyToOne(() => Member, member => member.services),
    __metadata("design:type", Object)
], Service.prototype, "author", void 0);
__decorate([
    CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Service.prototype, "createdAt", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Service.prototype, "content", void 0);
__decorate([
    Column({ type: 'int' }),
    __metadata("design:type", Number)
], Service.prototype, "timeElapse", void 0);
__decorate([
    Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Service.prototype, "date", void 0);
__decorate([
    OneToMany(() => Event, event => event.service),
    __metadata("design:type", Object)
], Service.prototype, "events", void 0);
Service = __decorate([
    Entity()
], Service);
export { Service };
