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
import { FormType, DataType, PageView, Action } from "../src/utils/types";
import { auth, dbClient } from "../config/model";
import { Session } from "./Session";
import { Invitation } from "./Invitation";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Attendance } from "./Attendance";
import { Service } from "./Service";
let Event = class Event {
    async getCreateData(data) {
        const form = new FormType('', 'Submit', [
            {
                title: '',
                index: 1,
                actions: {
                    submit: new Action({
                        async event(filledForm) {
                            const user = await auth.getUser();
                            filledForm.user_id = user.id;
                            const query = {
                                name: "",
                                data: filledForm,
                                filter: [],
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
                        answer: '',
                        inputType: 'text'
                    },
                    {
                        question: 'start',
                        name: "start_at",
                        answer: '',
                        inputType: 'schedule',
                    },
                    {
                        question: 'end',
                        name: 'end_at',
                        answer: '',
                        inputType: 'date'
                    },
                ]
            },
        ]);
        const view = new PageView({
            id: "",
            layout: "Grid",
            sections: [form],
            children: []
        });
        return view;
    }
    async getListData(filters) {
        const upcomingView = {
            id: 'upcoming',
            sections: await this.getEvents('upcoming')
        };
        const markedView = {
            id: 'marked',
            sections: await this.getEvents('marked')
        };
        const todayView = {
            id: 'today',
            sections: await this.getEvents('today')
        };
        const view = new PageView({
            id: "",
            layout: "Grid",
            sections: [upcomingView, markedView, todayView],
            children: []
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
        };
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
    async getEvents(eventStatus) {
        let query;
        switch (eventStatus) {
            case 'upcoming':
                query = gql `{
                events (startAt {
                    gt: {${new Date()}}})
                }`;
                break;
            case 'marked':
                query = gql `{
                events (startAt {
                    lt: {
                    ${new Date()}
                    }
                    })
                }`;
                break;
            case 'today':
                query = gql `{
                events (startAt ${new Date()})
            }`;
                break;
        }
        const data = await dbClient.get(query);
        const dataType = new DataType({
            items: {
                header: [
                    { label: data.name }
                ],
                center: [
                    { label: data.start_at },
                    { label: data.end_at }
                ]
            }
        });
        return dataType;
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
                    answer: '',
                    inputType: 'text'
                },
                {
                    question: 'start',
                    name: 'start_at',
                    answer: '',
                    inputType: 'schedule'
                },
                {
                    question: 'end',
                    name: 'end_at',
                    answer: '',
                    inputType: 'date'
                },
                {
                    question: 'anchor',
                    name: 'anchor',
                    answer: '',
                    options: options
                },
                {
                    question: 'content',
                    name: 'content',
                    answer: '',
                    inputType: 'textarea'
                }
            ]
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
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Event.prototype, "id", void 0);
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
