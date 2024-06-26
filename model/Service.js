var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { auth, dbClient } from "../config/model";
<<<<<<< HEAD
import { Action, DataList, DataType, QuestionType, View } from "../src/utils/types";
=======
import { Action, DataList, DataType, PageView, QuestionType } from "../src/utils/types";
>>>>>>> master
import { Share } from "../service/shareSrv";
import EUpload from "../src/components/EUpload.vue";
import { Member } from "./Member";
import { Event } from "./Event";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
<<<<<<< HEAD
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
        var _a;
        const userId = (_a = (await auth.getUser()).data.user) === null || _a === void 0 ? void 0 : _a.id;
=======
import { getData } from "./DataView";
import { date } from "quasar";
let Service = class Service {
    id = 'services';
    name;
    anchors;
    author;
    created_at;
    content;
    timeElapse;
    date;
    events;
    view = {
        sections: [EUpload],
        id: "videoView",
        layout: "Grid",
        size: "",
        navType: "top"
    };
    async create() {
        const userId = (await auth.getUser()).data.user?.id;
        let id;
>>>>>>> master
        const form = new QuestionType({
            title: "Create new service",
            id: '',
            index: 1,
            sections: [],
            actions: {
                submit: new Action({
<<<<<<< HEAD
                    label: "Submit",
                    event(filledForm) {
                        const service = {
                            name: filledForm.name,
                            created_at: new Date().toUTCString(),
                            author_id: userId
=======
                    label: "Create",
                    async event(filledForm) {
                        const service = {
                            name: filledForm.name,
                            created_at: new Date().toUTCString(),
                            author_id: userId,
                            day: filledForm.day,
                            startTime: filledForm.startTime,
                            endTime: filledForm.endTime
>>>>>>> master
                        };
                        const query = {
                            name: 'service',
                            data: service,
                        };
<<<<<<< HEAD
                        dbClient.post(query);
                    }
                })
=======
                        const { data, error } = await dbClient.post(query);
                        id = data.data[0].id;
                        return { data, error };
                    },
                    onResult: {
                        redirect: {
                            name: 'id',
                            param: {
                                id
                            }
                        }
                    }
                }),
>>>>>>> master
            },
            content: [{
                    question: 'name',
                    name: 'name',
                    inputType: 'text'
                },
<<<<<<< HEAD
            ]
        });
        const view = new View({
            id: "createService",
            layout: "Grid",
            sections: [form],
            size: '',
            navType: 'center'
=======
                {
                    question: 'day',
                    name: 'day',
                    inputType: 'text'
                },
                {
                    question: 'start',
                    name: 'start_time',
                    inputType: 'time'
                },
                {
                    question: 'end',
                    name: 'end_time',
                    inputType: 'time'
                }
            ]
        });
        const view = new PageView({
            id: "createService",
            layout: "Grid",
            sections: [form],
            children: []
>>>>>>> master
        });
        return view;
    }
    async getListData(query, dataArg) {
<<<<<<< HEAD
        var _a;
=======
        const useQuery = query || 'service';
>>>>>>> master
        let dataList = new DataList({
            items: [],
            actions: [
                new Action({
                    label: 'Create',
                    icon: 'add',
                    event: 'Route',
<<<<<<< HEAD
=======
                    viewGuard: true,
>>>>>>> master
                    args: {
                        name: 'categories',
                        params: {
                            categories: ['create']
                        }
                    },
                })
            ]
        });
        let data;
        if (dataArg) {
            data = dataArg;
        }
        else {
            if (query) {
                data = await dbClient.get(query);
            }
            else {
                data = await dbClient.get('service');
            }
        }
        if (data) {
<<<<<<< HEAD
            const items = (_a = data.data) === null || _a === void 0 ? void 0 : _a.map((dat) => {
                var _a;
                return new DataType({
                    id: '',
                    sections: [],
                    items: {
                        header: [
                            {
                                label: dat.name
                            },
                            {
                                label: (_a = dat.created_at) === null || _a === void 0 ? void 0 : _a.toString()
                            },
                        ],
                        footer: [
                            {
                                action: new Action({
                                    label: 'open',
                                    event: 'Route',
                                    args: {
                                        name: 'id',
                                        params: {
                                            id: dat.id
                                        }
                                    },
                                    viewGuard: true
                                })
                            }
                        ]
                    }
                });
            });
            dataList.items = items;
        }
        const view = new View({
            id: "services",
            layout: "Grid",
            sections: [dataList],
            size: '',
            navType: 'center'
=======
        }
        const items = await getData(useQuery, (dat) => {
            return new DataType({
                id: '',
                sections: [],
                items: {
                    header: [
                        {
                            label: dat.name
                        },
                        {
                            label: date.formatDate(dat.created_at, 'YYYY-MM-DD, HH:mm A')
                        },
                    ],
                    footer: [
                        {
                            action: new Action({
                                label: 'open',
                                event: 'Route',
                                args: {
                                    name: 'id',
                                    params: {
                                        id: dat.id
                                    }
                                },
                            })
                        }
                    ]
                }
            });
        });
        dataList.items = items;
        const view = new PageView({
            id: "services",
            layout: "Grid",
            sections: [dataList],
            children: []
>>>>>>> master
        });
        return view;
    }
    async getSingleData(id, query, argData) {
        const share = new Share();
        let eventQuery;
        if (id) {
            eventQuery = {
                name: "event",
                data: undefined,
                filters: [
                    {
                        op: 'eq',
                        col: 'service_id',
                        val: id
                    }
                ]
            };
        }
        else if (query) {
            eventQuery = query;
        }
        const event = new Event();
        const eventView = await event.getListData(eventQuery);
        let dataType = {
            items: {
                header: undefined,
                center: undefined,
                footer: undefined,
                left: undefined,
                right: undefined
            },
            sections: [],
            id: ''
        };
        let data;
        if (argData) {
            data = argData;
        }
        else {
            let serviceQuery;
            if (id) {
                serviceQuery = {
                    name: 'service',
                    data: undefined,
                    filters: [
                        {
                            op: 'eq',
                            col: 'id',
                            val: id
                        }
                    ]
                };
            }
            else if (query) {
                serviceQuery = query;
            }
            data = await dbClient.get(serviceQuery);
        }
        const items = data.data[0];
        let media = {
            url: '',
            description: items.content,
            thumbnail: items.name,
            title: items.name
        };
        const getStatus = () => {
            const now = new Date();
            let status = '';
            if (now >= items.start && now <= items.end) {
                status = 'active';
            }
            if (now > items.end) {
                status = 'ended';
            }
            if (now < items.start) {
                status = 'scheduled';
            }
            return status;
        };
        dataType = new DataType({
            id: '',
            sections: [],
            items: {
                header: [
                    {
                        label: items.name
                    },
                    {
                        label: items.createdAt
                    },
                    {
                        label: items.timeElapse
                    }
                ],
                center: [
                    (await eventView).sections
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
<<<<<<< HEAD
                            label: 'edit',
                            icon: 'edit',
                            event() {
=======
                            label: 'Edit',
                            icon: 'edit',
                            event() {
                                const { data, error } = { data: true, error: false };
                                return { data, error };
>>>>>>> master
                            },
                        })
                    },
                    {
                        label: getStatus()
                    }
                ]
            }
        });
<<<<<<< HEAD
        const view = new View({
=======
        const view = new PageView({
>>>>>>> master
            id: data.id,
            layout: "Grid",
            sections: [
                dataType,
                eventView
            ],
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
<<<<<<< HEAD
], Service.prototype, "createdAt", void 0);
=======
], Service.prototype, "created_at", void 0);
>>>>>>> master
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
