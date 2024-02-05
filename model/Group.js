var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Action, DataType } from "../src/utils/types";
import { dbClient, auth } from "../config/model";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, JoinTable, ManyToMany } from "typeorm";
import { Member } from "./Member";
import { Admin } from "./Admin";
export class Group {
    getCreateData(data) {
        throw new Error("Method not implemented.");
    }
    async getListData(filter) {
        const query = {
            name: "",
            data: undefined,
            filter: filter,
            columns: []
        };
        const data = await dbClient.get(query);
        const dataType = new DataType({
            items: {
                header: data.map((group) => {
                    return { label: group.name };
                }),
                footer: [
                    {
                        action: new Action({
                            label: "Join a group",
                            async event() {
                                const user = await auth.getUser();
                                const query = {
                                    name: "group",
                                    data: {
                                        id: data.id,
                                        user_id: user.id
                                    },
                                    filter: [],
                                };
                                dbClient.post(query);
                            }
                        })
                    }
                ]
            }
        });
        const view = {
            id: "group",
            layout: "Grid",
            sections: [dataType],
            children: []
        };
        return view;
    }
    async getSingleData(filter) {
        const query = {
            name: "",
            data: undefined,
            filter: filter,
            columns: []
        };
        const data = await dbClient.get(query);
        const dataType = new DataType({
            items: {
                header: [
                    {
                        label: data.name
                    }
                ],
                center: data.members.map((member) => {
                    return {
                        label: `${member.firstName} ${member.lastName}`
                    };
                })
            }
        });
        const view = {
            id: "group",
            layout: "Grid",
            sections: [dataType],
            children: []
        };
        return view;
    }
}
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Group.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Group.prototype, "created_at", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Group.prototype, "coordinator", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Group.prototype, "creator", void 0);
__decorate([
    ManyToMany(() => Member, (member) => member.groups),
    JoinTable(),
    __metadata("design:type", Object)
], Group.prototype, "members", void 0);
__decorate([
    ManyToMany(() => Admin, (admin) => admin.groups),
    JoinTable(),
    __metadata("design:type", Object)
], Group.prototype, "admins", void 0);
