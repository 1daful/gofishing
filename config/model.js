var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DataType, NavList, View, isType } from '../src/utils/types';
import { EAuth, Repository, SDKClient } from "@edifiles/services";
import { header } from '../src/utils/DataView';
import { SupabaseRepo } from '@edifiles/services/dist/module/model/SupabaseRepo';
import { gql } from 'graphql-tag';
import { config } from "../public/config";
import { Slides } from '../src/utils/DataTypes';
import { GlobalView } from './edifiles.config';
import { Group } from '../model/Group';
export const domainNames = [];
const db = new Repository(config.api.Supabase);
export class MemberList2 {
    constructor(data) {
        this.card = true;
        Object.assign(this, data);
        this.items.header.forEach((content) => {
            let key = content[content.prop];
            let value = this[content.key];
            let gh = [];
            gh[key] = value;
            content[content.prop] = this[content.key];
            console.log('PROP ', content);
        });
    }
}
__decorate([
    header('left'),
    __metadata("design:type", String)
], MemberList2.prototype, "firstName", void 0);
__decorate([
    header('center'),
    __metadata("design:type", String)
], MemberList2.prototype, "lastName", void 0);
__decorate([
    header('left', '', 'last seen'),
    __metadata("design:type", Object)
], MemberList2.prototype, "lastTime", void 0);
__decorate([
    header('center', 'thumbnail'),
    __metadata("design:type", String)
], MemberList2.prototype, "thumbnail", void 0);
export const dbClient = new SDKClient(new SupabaseRepo(config.api.Supabase));
export const auth = new EAuth(config.api.Supabase);
export class Service extends DataType {
    constructor(data) {
        super(data);
    }
}
export class Achievement extends DataType {
    constructor(data) {
        super(data);
    }
}
class MemberList extends DataType {
    constructor(data) {
        super(data);
        this.card = true;
    }
}
class Messages extends DataType {
    constructor(data) {
        super(data);
        this.recipient_ids = [];
    }
}
class Milestone {
}
const computedDate = new Date().setDate(new Date().getDate() - 7 * 24 * 60 * 60 * 1000);
const firstTimerQuery = gql `{
    member(firstTime: {gt:${computedDate} }) {
        firstName
        lastName
    }
}`;
export const firstTimer = new View({
    sections: [await dbClient.get(firstTimerQuery)],
    id: '',
    layout: 'Grid',
    size: '',
    navType: 'left'
});
export const data = {
    id: '1',
    name: "Paul",
    avatar: '../public/logo.png',
    firstName: "John",
    lastName: "Ral",
    contacts: [],
    address: '',
    createdAt: new Date(),
    lastTime: new Date(),
    thumbnail: '../public/logo.png',
    overlay: '../public/logo.png'
};
export const services = await dbClient.get("service");
export function get(Type, params, value) {
    if (value) {
    }
    return new Type(data);
}
export function get2(Type, params, value) {
    if (value) {
    }
    const data = {
        id: '1',
        firstName: "Petr",
        lastName: "Israel",
        contacts: [],
        address: '',
        createdAt: new Date(),
        lastTime: new Date(),
        thumbnail: '../public/logo.png',
        overlay: '../public/logo.png'
    };
    return Object.freeze(new Type(data));
}
export const members = get(MemberList);
console.log("MEMBERS: ", members);
export async function post(Type, items) {
    const data = await db.addItem(Type.name, items);
    return new Type(data);
}
export const getNotificationSlides = async () => {
    const servicesQuery = gql `services {
    }`;
    const eventsQuery = gql `events {
    }`;
    const milestonesQuery = gql `milestones {
    }`;
    const birthdaysQuery = gql `birthday {
    }`;
    const announcementsQuery = gql `announcements {
    }`;
    const serviceSlide = await dbClient.get(servicesQuery);
    const eventSlide = await dbClient.get(eventsQuery);
    const milestoneSlide = await dbClient.get(milestonesQuery);
    const birthdaySlide = await dbClient.get(birthdaysQuery);
    const announcementSlide = await dbClient.get(announcementsQuery);
    return new Slides(serviceSlide, eventSlide, milestoneSlide, birthdaySlide, announcementSlide);
};
export const getServicesSlides = async () => {
    const prevServiceQuery = gql `service {

    }`;
    const currentServiceQuery = gql `service {

    }`;
    const nextServiceQuery = gql `service {

    }`;
    const prevServiceSlide = await dbClient.get(prevServiceQuery);
    const currentServiceSlide = await dbClient.get(currentServiceQuery);
    const nextServiceSlide = await dbClient.get(nextServiceQuery);
    new Slides(prevServiceSlide, currentServiceSlide, nextServiceSlide);
};
export const getMilestones = async () => {
    const query = gql `milestones {

    }`;
    const milestones = await dbClient.get(query);
    return milestones;
};
export async function addModel(clazz, parentView, id, ...query) {
    let view;
    const childView = new clazz();
    childView.id = childView.constructor.name;
    const navList = new NavList({
        id: childView.id,
        sections: [],
        content: [
            {
                path: '/' + childView.id,
                name: childView.id
            }
        ],
        navType: 'top'
    });
    if (parentView) {
        view = await parentView.getListData(...query);
        view.sections.push(navList);
        view.children.push(childView);
    }
    else {
        if (id) {
            GlobalView.mainLayout.sections.forEach((view) => {
                if (isType(view, NavList) && view.id === id) {
                    view.content.push({
                        path: '/' + childView.id,
                        name: childView.id
                    });
                }
            });
            GlobalView.mainLayout.children.push(childView);
        }
        else {
            GlobalView.mainLayout.sections.push(navList);
            GlobalView.mainLayout.children.push(childView);
        }
    }
    console.log("GlobalView: ", GlobalView);
}
export function getModel(clazz) {
    const model = new clazz();
    model.id = model.constructor.name;
    return model;
}
export const models = [
    {
        name: 'group',
        val: new Group()
    }
];
