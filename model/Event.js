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
import { DataType, QuestionType, Action, View, DataList } from "../src/utils/types";
import { auth, dbClient } from "../config/model";
import { Session } from "./Session";
import { Invitation } from "./Invitation";
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Attendance } from "./Attendance";
import { Service } from "./Service";
let Event = class Event {
    constructor() {
        this.id = 'events';
    }
    async getCreateData(data) {
        const form = new QuestionType({
            sections: [],
            title: '',
            id: '',
            index: 1,
            actions: {
                submit: new Action({
                    async event(filledForm) {
                        var _a;
                        const user = await auth.getUser();
                        filledForm.user_id = (_a = user.data.user) === null || _a === void 0 ? void 0 : _a.id;
                        const query = {
                            name: "event",
                            data: filledForm,
                            columns: []
                        };
                        dbClient.post(query);
                    }
                })
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
                    inputType: 'date'
                },
                {
                    question: 'select service',
                    inputType: 'date',
                    name: 'service_id'
                }
            ]
        });
        const view = new View({
            id: "",
            layout: "Grid",
            sections: [form],
            size: '',
            navType: 'center'
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
        const upcomingView = {
            id: 'upcoming',
            sections: await this.getEvents('upcoming', query)
        };
        const markedView = {
            id: 'marked',
            sections: await this.getEvents('marked', query)
        };
        const todayView = {
            id: 'today',
            sections: await this.getEvents('today', query)
        };
        const view = new View({
            id: "",
            layout: "Grid",
            sections: [createEvent, upcomingView, markedView, todayView],
            size: '',
            navType: 'center'
        });
        return view;
    }
    async getSingleData(id) {
        const query = gql `{
            event(id: ${id})
        }`;
        const data = await dbClient.get(query);
        const dataType = {
            items: {
                header: [
                    { label: data.name }
                ],
                center: [
                    {
                        label: data.start_at.toUTCString()
                    },
                    { label: "to" },
                    { label: data.end_at.toUTCString() }
                ],
                footer: [
                    data.sessions.filter((session) => {
                        this.getSessionDataView(session);
                    }),
                    {
                        action: new Action({
                            event: 'Modal',
                            args: await this.createSessionDataView(data.id)
                        })
                    }
                ]
            },
            sections: [],
            id: undefined
        };
        const view = new View({
            sections: [
                dataType
            ],
            id: "",
            layout: "Grid",
            size: '',
            navType: 'center'
        });
        return view;
    }
    async getEvents(eventStatus, query) {
        var _a, _b, _c;
        let eventQuery = query || {
            name: 'event',
            data: undefined
        };
        switch (eventStatus) {
            case 'upcoming':
                (_a = eventQuery.filters) === null || _a === void 0 ? void 0 : _a.push({
                    op: 'gt',
                    col: 'start_at',
                    val: new Date().toUTCString()
                });
                break;
            case 'marked':
                (_b = eventQuery.filters) === null || _b === void 0 ? void 0 : _b.push({
                    op: 'lt',
                    col: 'start_at',
                    val: new Date().toUTCString()
                });
                break;
            case 'today':
                (_c = eventQuery.filters) === null || _c === void 0 ? void 0 : _c.push({
                    op: 'eq',
                    col: 'start_at',
                    val: new Date().toUTCString()
                });
                break;
        }
        const data = await dbClient.get(eventQuery);
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
    async getSessionDataView(session) {
        let startTime = session.start_at;
        let timeRemaining;
        let timeElapse;
        const dataType = new DataType({
            items: {
                header: [
                    {
                        label: session.name
                    },
                    {
                        label: session.author.firstName
                    },
                    {
                        label: session.author.lastName
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
            calculateTime() {
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
            },
            computeAction() {
                setInterval(this.calculateTime, 1000);
            }
        });
        return dataType;
    }
    async createSessionDataView(eventId) {
        const membersQuery = gql `{
            member {
                firstName
                lastName
                avatar
            }
        }`;
        const groupsQuery = gql `{
            member {
                name
                members
                admins
            }
        }`;
        const groupOptions = await dbClient.get(groupsQuery);
        const memberOptions = await dbClient.get(membersQuery);
        const options = [
            {
                label: 'members',
                data: memberOptions
            },
            {
                label: 'groups',
                data: groupOptions
            }
        ];
        const question = {
            title: "",
            id: '',
            index: 2,
            actions: {
                submit: new Action({
                    event(filledForm) {
                        const session = {
                            event_id: eventId,
                            name: filledForm.name,
                            start_at: filledForm.start_at,
                            end_at: filledForm.end_at,
                            anchor: filledForm.anchor,
                            content: filledForm.content
                        };
                        dbClient.post(gql `{session(${session}) }`);
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
                    options: options
                },
                {
                    question: 'content',
                    name: 'content',
                    inputType: 'textarea'
                }
            ],
            sections: []
        };
        const view = {
            id: "",
            layout: "Grid",
            sections: [question],
            size: "",
            navType: "center"
        };
        return view;
    }
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
