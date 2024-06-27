var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DataType, QuestionType, Action, DataList, PageView, Filters } from "../src/utils/types";
import { auth, dbClient } from "../config/model";
import { Session } from "./Session";
import { Invitation } from "./Invitation";
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Attendance } from "./Attendance";
import { Service } from "./Service";
import { getData } from "./DataView";
import { foreignColumns } from "@edifiles/services/dist/module/utility/Query";
let Event = class Event {
    id = 'events';
    create_at;
    start_at;
    end_at;
    name;
    sessions;
    invitations;
    attendances;
    service;
    async create(data) {
        const serviceQuery = {
            name: "service",
            data: undefined,
            columns: [
                'name'
            ]
        };
        const options = await dbClient.get(serviceQuery);
        const form = new QuestionType({
            sections: [
                new Filters({
                    id: '',
                    indexName: '',
                    sections: [],
                    layout: 'Grid',
                    size: '',
                    checks: [
                        {
                            id: '',
                            attribute: "",
                            values: [
                                'Add to service'
                            ],
                            model: []
                        }
                    ]
                })
            ],
            title: '',
            id: '',
            index: 1,
            actions: {
                submit: new Action({
                    label: 'Create event',
                    async event(filledForm) {
                        const user = await auth.getUser();
                        filledForm.user_id = user.data.user?.id;
                        const query = {
                            name: "event",
                            data: filledForm,
                            columns: []
                        };
                        dbClient.post(query);
                    }
                }),
            },
            content: [
                {
                    question: 'name of event',
                    name: 'name',
                    inputType: 'text'
                },
                {
                    question: 'start',
                    name: "start_at",
                    inputType: 'schedule',
                },
                {
                    question: 'end',
                    name: 'end_at',
                    inputType: 'schedule'
                },
                {
                    question: 'select service',
                    options,
                    name: 'service_id'
                }
            ]
        });
        const view = new PageView({
            id: "",
            layout: "Grid",
            sections: [form],
            children: []
        });
        return view;
    }
    async getListData(query) {
        const createEvent = new Action({
            label: 'Create',
            event: 'Route',
            args: {
                name: 'categories',
                params: {
                    categories: ['create']
                }
            },
        });
        let eventQuery = query || {
            name: 'event',
            data: undefined
        };
        const upcoming = await this.getEvents('upcomiing', query);
        const markedView = await this.getEvents('marked', query);
        const ongoingView = await this.getEvents('ongoing', query);
        const upcomingEvents = new DataList({
            items: [],
            actions: [
                new Action({
                    label: 'Create',
                    icon: 'add',
                    event: 'Route',
                    viewGuard: true,
                    args: {
                        name: 'categories',
                        params: {
                            categories: ['create']
                        }
                    },
                })
            ]
        });
        const callback = (dat) => {
            return new DataType({
                id: '',
                sections: [],
                items: {
                    header: [
                        {
                            action: new Action({
                                label: 'open',
                                event: 'Route',
                                args: {
                                    name: 'id',
                                    params: {
                                        id: dat.id
                                    }
                                }
                            })
                        },
                        { label: dat.name }
                    ],
                    center: [
                        { label: dat.start_at },
                        { label: dat.end_at }
                    ]
                }
            });
        };
        const upcomingQuery = query || {
            name: 'event',
            data: undefined,
            filters: [{
                    op: 'gt',
                    col: 'start_at',
                    val: new Date().toUTCString()
                }]
        };
        const items = await getData('event', callback);
        const t = items[0];
        upcomingEvents.items = items;
        console.log('GetDat ', upcomingEvents);
        const view = new PageView({
            id: "",
            layout: "Grid",
            sections: [createEvent, t, upcomingEvents],
            children: []
        });
        return view;
    }
    async getSingleData(id) {
        const query = {
            name: 'event',
            filters: [
                {
                    op: "eq",
                    col: "id",
                    val: id
                }
            ],
            columns: [
                'name', 'start_at', 'end_at', foreignColumns('session', ['name', 'content'])
            ],
            data: undefined
        };
        const items = await dbClient.get(query);
        const data = items.data[0];
        const dataType = new DataType({
            items: {
                header: [
                    {
                        action: new Action({
                            label: 'Take Attendance',
                            event: 'Route',
                            args: {
                                path: '/attendance/create',
                                query: {
                                    filters: id
                                }
                            }
                        }),
                    },
                    { label: data.name }
                ],
                center: [
                    {
                        label: data.start_at
                    },
                    { label: "to" },
                    { label: data.end_at },
                    {
                        action: new Action({
                            label: 'Create Session',
                            event: 'Route',
                            args: {
                                name: 'categories',
                                params: {
                                    categories: ['createSessionDataView']
                                },
                                query: {
                                    filters: id
                                }
                            }
                        })
                    },
                ],
                footer: data.session?.map((session) => {
                    return this.getSessionDataView(session);
                })
            },
            sections: [],
            id: ''
        });
        const view = new PageView({
            sections: [
                dataType
            ],
            id: "",
            layout: "Grid",
            children: []
        });
        return view;
    }
    async getEvents(eventStatus, query) {
        let eventQuery = query || {
            name: 'event',
            data: undefined
        };
        switch (eventStatus) {
            case 'upcoming':
                eventQuery.filters?.push({
                    op: 'gt',
                    col: 'start_at',
                    val: new Date().toUTCString()
                });
                break;
            case 'marked':
                eventQuery.filters?.push({
                    op: 'lt',
                    col: 'start_at',
                    val: new Date().toUTCString()
                });
                break;
            case 'ongoing':
                eventQuery.filters?.push({
                    op: 'eq',
                    col: 'start_at',
                    val: new Date().toUTCString()
                });
                break;
        }
        const data = await dbClient.get(eventQuery);
        return data;
    }
    getEvent(data) {
        const dataList = new DataList({
            items: []
        });
        dataList.items = data.data.map((dat) => {
            return new DataType({
                id: '',
                sections: [],
                items: {
                    header: [
                        { label: dat.name }
                    ],
                    center: [
                        { label: dat.start_at },
                        { label: dat.end_at }
                    ]
                }
            });
        });
        return dataList;
    }
    getSessionDataView(session) {
        let startTime = session.start_at;
        let timeRemaining = "";
        let timeElapse = '';
        const dataType = new DataType({
            items: {
                header: [
                    {
                        label: session.name
                    },
                    {
                        label: timeRemaining
                    }
                ],
                center: [
                    {
                        label: session.content
                    }
                ],
                footer: [
                    {}
                ],
            },
            computeAction: () => {
                setInterval(this.calculateTime, 1000, timeRemaining, startTime);
            },
            id: '',
            sections: []
        });
        return dataType;
    }
    createSessionDataView = async (eventId) => {
        const membersQuery = {
            name: 'member',
            columns: ['id', 'firstName'],
            data: undefined
        };
        const groupsQuery = {
            name: 'member',
            data: undefined
        };
        const groupOptions = await dbClient.get(groupsQuery);
        const memberOptions = await dbClient.get(membersQuery);
        const groups = groupOptions.data.map((group) => {
            return {
                label: group.firstName,
                meta: {
                    id: group.id,
                    type: 'group'
                }
            };
        });
        const members = memberOptions.data.map((member) => {
            return {
                label: member.firstName,
                meta: {
                    id: member.id,
                    type: 'member'
                }
            };
        });
        const options = [
            {
                label: 'members',
                children: members
            },
            {
                label: 'groups',
                children: groups,
                events: {
                    click: () => {
                        console.log('Clicked');
                    }
                }
            }
        ];
        const question = new QuestionType({
            title: "",
            id: '',
            index: 0,
            actions: {
                submit: new Action({
                    label: 'create',
                    event(filledForm) {
                        let groupId;
                        let memberId;
                        if (filledForm.anchor.type === 'group') {
                            groupId = filledForm.anchor.id;
                        }
                        else if (filledForm.anchor.type === 'member') {
                            memberId = filledForm.anchor.id;
                        }
                        const session = {
                            event_id: eventId,
                            name: filledForm.name,
                            start_at: filledForm.start_at,
                            end_at: filledForm.end_at,
                            anchor_group_id: groupId,
                            anchor_member_id: memberId,
                            content: filledForm.content
                        };
                        const sessionQuery = {
                            name: 'session',
                            data: session
                        };
                        dbClient.post(sessionQuery);
                    }
                })
            },
            content: [
                {
                    question: 'name',
                    name: 'name',
                    inputType: 'text'
                },
                {
                    question: 'start',
                    name: 'start_at',
                    inputType: 'schedule'
                },
                {
                    question: 'end',
                    name: 'end_at',
                    inputType: 'date'
                },
                {
                    question: 'anchor',
                    name: 'anchor',
                    options: options,
                    events: {
                        click: () => {
                            console.log('Clicked');
                        }
                    }
                },
                {
                    question: 'content',
                    name: 'content',
                    inputType: 'textarea'
                }
            ],
            sections: []
        });
        const view = {
            id: "",
            layout: "Grid",
            sections: [question],
            children: []
        };
        return view;
    };
    calculateTime = (timeRemaining, startTime, timeElapse) => {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime.getTime();
        const totalEventDuration = 3 * 60 * 60 * 1000;
        const remainingTime = totalEventDuration - elapsedTime;
        const elapsedHours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const elapsedMinutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const elapsedSeconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        timeElapse = `Time Elapsed: ${elapsedHours}h ${elapsedMinutes}m ${elapsedSeconds}s`;
        timeRemaining = `Time Remaining: ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;
    };
};
__decorate([
    Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Event.prototype, "create_at", void 0);
__decorate([
    Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Event.prototype, "start_at", void 0);
__decorate([
    Column({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Event.prototype, "end_at", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Event.prototype, "name", void 0);
__decorate([
    OneToMany(() => Session, session => session.event),
    __metadata("design:type", Object)
], Event.prototype, "sessions", void 0);
__decorate([
    OneToMany(() => Invitation, invitation => invitation.event),
    __metadata("design:type", Object)
], Event.prototype, "invitations", void 0);
__decorate([
    OneToMany(() => Attendance, (attendance) => attendance.event),
    __metadata("design:type", Object)
], Event.prototype, "attendances", void 0);
__decorate([
    ManyToOne(() => Service, (service) => service.events),
    __metadata("design:type", Object)
], Event.prototype, "service", void 0);
Event = __decorate([
    Entity()
], Event);
export { Event };
