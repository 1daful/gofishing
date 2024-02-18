var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DataType, PageView, QuestionType } from "../src/utils/types";
import { getCreateData } from "./DataView";
import { dbClient } from "../config/model";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable, OneToOne } from "typeorm";
import { foreignColumns } from "@edifiles/services/dist/module/utility/Query";
import { Group } from "./Group";
import { Session } from "./Session";
import { Invitation } from "./Invitation";
import { Service } from "./Service";
import { Admin } from "./Admin";
import { Attendance } from "./Attendance";
export class Member {
    constructor(data) {
        Object.assign(this, data);
    }
    async getSingleData(id) {
        const groupView = new PageView({
            id: "",
            layout: "Grid",
            sections: [],
            children: []
        });
        const query = {
            name: "member",
            data: undefined,
            filters: [{
                    op: 'eq',
                    col: 'id',
                    val: id
                }]
        };
        const data = await dbClient.get(query);
        const dataType = new DataType({
            items: {
                header: [
                    {
                        label: data.firstName,
                        avatar: data.avatar
                    },
                    {
                        label: data.lastName
                    }
                ],
                center: [
                    {
                        label: `Joined: ${data.created_at}`
                    },
                    {
                        label: `Last seen: ${data.created_at}`
                    }
                ]
            }
        });
        const view = {
            sections: [dataType],
            id: "",
            layout: "Grid",
            size: "",
            navType: "top"
        };
        return view;
    }
    async getCreateData(image) {
        const data = new QuestionType({
            id: "",
            title: 'Add new member data',
            index: 0,
            actions: {},
            content: [
                {
                    question: '',
                    image: image,
                    name: 'avatar'
                },
                {
                    question: 'first name',
                    inputType: 'text',
                    name: 'firstName'
                },
                {
                    question: 'last name',
                    inputType: 'text',
                    name: 'lastName'
                },
                {
                    question: 'email',
                    inputType: 'email',
                    name: 'email'
                },
                {
                    question: 'phone number',
                    inputType: 'tel',
                    name: 'phoneNumber'
                },
                {
                    question: 'address',
                    inputType: 'text',
                    name: 'address'
                }
            ]
        });
        const form = getCreateData({
            content: data,
            index: 1
        });
        const view = {
            id: "",
            layout: "Grid",
            sections: [form],
            size: "",
            navType: "top"
        };
        return view;
    }
    async getListData(filters) {
        let query = {
            name: "member",
            data: undefined,
            filters: filters,
            columns: []
        };
        const data = await dbClient.get(query);
        const dataType = new DataType({
            items: {
                header: [
                    {
                        avatar: data.avatar
                    },
                    {
                        label: `${data.firstName} ${data.lastName}`
                    }
                ],
                center: [
                    {
                        label: `Joined: ${data.created_at}`
                    },
                    {
                        label: `Last seen: ${data.lastTime}`
                    }
                ],
                footer: []
            }
        });
        const view = {
            sections: [dataType],
            id: "",
            layout: "Grid",
            size: "",
            navType: "top"
        };
        return view;
    }
    getFirstTimers() {
        const firstTimerQuery = {
            name: "member",
            data: undefined,
            filters: [
                {
                    op: 'eq',
                    col: 'attendance_count.count',
                    val: 1
                }
            ],
            columns: [
                foreignColumns('attendance_count', ['count'])
            ]
        };
        return firstTimerQuery;
    }
}
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Member.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Member.prototype, "firstName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Member.prototype, "lastName", void 0);
__decorate([
    Column({ type: 'simple-array' }),
    __metadata("design:type", Array)
], Member.prototype, "contacts", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Member.prototype, "address", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Member.prototype, "created_at", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Member.prototype, "updated_at", void 0);
__decorate([
    Column({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Member.prototype, "lastTime", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "avatar", void 0);
__decorate([
    ManyToMany(() => Group, (group) => group.members),
    JoinTable(),
    __metadata("design:type", Object)
], Member.prototype, "groups", void 0);
__decorate([
    OneToMany(() => Invitation, (invitation) => invitation.sender),
    __metadata("design:type", Object)
], Member.prototype, "sentInvitations", void 0);
__decorate([
    ManyToMany(() => Invitation, (invitation) => invitation.recipients),
    JoinTable(),
    __metadata("design:type", Object)
], Member.prototype, "receivedInvitations", void 0);
__decorate([
    ManyToMany(() => Session, (session) => session.author),
    JoinTable(),
    __metadata("design:type", Object)
], Member.prototype, "sessions", void 0);
__decorate([
    OneToMany(() => Service, (service) => service.author),
    __metadata("design:type", Object)
], Member.prototype, "services", void 0);
__decorate([
    OneToOne(() => Admin, (admin) => admin.member),
    __metadata("design:type", Object)
], Member.prototype, "admin", void 0);
__decorate([
    OneToMany(() => Attendance, (attendance) => attendance.member),
    __metadata("design:type", Object)
], Member.prototype, "attendances", void 0);
