var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NavList, isType } from '../src/utils/types';
import { EAuth, Repository, SDKClient } from "@edifiles/services";
import { header } from '../src/utils/DataView';
import { SupabaseRepo } from '@edifiles/services/dist/module/model/SupabaseRepo';
import { config } from "../public/config";
import { GlobalView } from './edifiles.config';
import { Group } from '../model/Group';
export const domainNames = [];
const db = new Repository(config.api.Supabase);
export class MemberList2 {
    constructor(data) {
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
    overlay;
    id;
    card = true;
    firstName;
    lastName;
    contacts;
    address;
    createdAt;
    lastTime;
    thumbnail;
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
