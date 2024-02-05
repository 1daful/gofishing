var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ManyToMany, JoinTable, OneToOne, Column, JoinColumn } from "typeorm";
import { Group } from "./Group";
import { Member } from "./Member";
export class Admin {
}
__decorate([
    OneToOne(() => Member, (member) => member.admin),
    JoinColumn(),
    __metadata("design:type", String)
], Admin.prototype, "member", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Admin.prototype, "role", void 0);
__decorate([
    ManyToMany(() => Group, (group) => group.admins),
    JoinTable(),
    __metadata("design:type", Object)
], Admin.prototype, "groups", void 0);
