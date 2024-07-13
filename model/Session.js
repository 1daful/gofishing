var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./Member";
import { Event } from "./Event";
let Session = class Session {
<<<<<<< HEAD
    getCreateData(data) {
=======
    id;
    start_at;
    end_at;
    name;
    author;
    timeRemaining;
    content;
    event;
    create(data) {
>>>>>>> master
        throw new Error("Method not implemented.");
    }
    getListData(query) {
        throw new Error("Method not implemented.");
    }
    getSingleData(id) {
        throw new Error("Method not implemented.");
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Session.prototype, "id", void 0);
__decorate([
    Column({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Session.prototype, "start_at", void 0);
__decorate([
    Column({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Session.prototype, "end_at", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Session.prototype, "name", void 0);
__decorate([
    ManyToOne(() => Member, member => member.sessions),
    __metadata("design:type", Object)
], Session.prototype, "author", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Session.prototype, "timeRemaining", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Session.prototype, "content", void 0);
__decorate([
    ManyToOne(() => Event, event => event.sessions),
    __metadata("design:type", Object)
], Session.prototype, "event", void 0);
Session = __decorate([
    Entity()
], Session);
export { Session };
