import { DataType, NavList, View, isType } from '../src/utils/types';
import { EAuth, Repository, SDKClient } from "@edifiles/services";
import { header } from '../src/utils/DataView';
import { DateLocale } from 'quasar';
import { SupabaseRepo } from '@edifiles/services/dist/module/model/SupabaseRepo';
import { gql } from 'graphql-tag';
import { config } from "../public/config";
import { Slides } from '../src/utils/DataTypes';
import { IDataView } from '../model/IDataView';
import { GlobalView } from './edifiles.config';
import { Group } from '../model/Group';
//import { entities } from "../init";

export const domainNames = []

const db = new Repository(config.api.Supabase)

export class MemberList2 {
    [x: string]: any;
    constructor(data: Record<string, any>) {
        Object.assign(this, data)
        this.items.header.forEach((content: { [x: string]: any; prop: string | number; key: string | number; }) => {
          let key = content[content.prop]
          let value = this[content.key]
          let gh = []
          gh[key] = value
          content[content.prop] = this[content.key]
          console.log('PROP ', content)
        });
    }
    //items = []
    overlay!: string
    id!: string
    card = true
    @header('left') firstName!: string
    @header('center') lastName!: string
    contacts!: []
    address!: ''
    createdAt!: DateLocale
    @header('left', '', 'last seen') lastTime!: DateLocale
    @header('center', 'thumbnail') thumbnail!: string
}

export const dbClient = new SDKClient(new SupabaseRepo(config.api.Supabase))
export const auth = new EAuth(config.api.Supabase)

//const members = dbClient.get(MemberList)

export class Service extends DataType {
    constructor(data: Record<string, any>) {
        super(data)
    }
    id!: string
    name!: string;
    anchors!: [];
    parent!: Service;
    author!: MemberList;
    createdAt!: DateLocale;
}

export class Achievement extends DataType{
    constructor(data: Record<string, any>) {
        super(data)
    }
    id!: string;
    title!: string;
    achiever_user_id!: string;
    achiever_groupd_id!: string;
    timestamp!: DateLocale;
}

class MemberList extends DataType {
    constructor(data: Record<string, any>) {
        super(data)
    }
    overlay!: string
    id!: string
    card = true
    firstName!: string
    lastName!: string
    contacts!: []
    address!: ''
    createdAt!: DateLocale
    lastTime!: DateLocale
    thumbnail!: string
    name!: string
    avatar!: string
}

class Messages extends DataType {
    constructor(data: Record<string, any>) {
        super(data)
    }
    id!: string;
    title!: string;
    content!: string;
    sender_group_id!: string;
    sender_user_id!: string;
    recipient_ids: [] = [];
    type!: string;
}

class Milestone {
    id!: string;
    content!: string;
    timestamp!: DateLocale;
}

const computedDate = new Date().setDate(new Date().getDate() - 7 * 24 * 60 * 60 * 1000)
const firstTimerQuery = gql`{
    member(firstTime: {gt:${
        computedDate
    } }) {
        firstName
        lastName
    }
}`

export const firstTimer: View = new View({
    sections: [await dbClient.get(firstTimerQuery)],
    id: '',
    layout: 'Grid',
    size: '',
    navType: 'left'
})
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
}
export const services = await dbClient.get("service")
//const date =  new Date().setDate(new Date().getDate() + 7)

export function get<T>(Type: new (data: any) => T, params?: string, value?: string) {
    if (value) {
        //const data = await db.readItem(Type.name, params, value)
       
        //return new Type(data)
    }
    //const data = await db.readItems(Type.name, undefined, [])
   
    //return Object.freeze(new Type(data))
    return new Type(data)
}

export function get2<T>(Type: new (data: any) => T, params?: string, value?: string) {
    if (value) {
        //const data = await db.readItem(Type.name, params, value)
       
        //return new Type(data)
    }
    //const data = await db.readItems(Type.name, undefined, [])
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
    }
    return Object.freeze(new Type(data))
    //return new Type(data)
}


export const members = get(MemberList)

console.log("MEMBERS: ", members)

export async function post<T>(Type: new (data: any) => T, items: Record<string, any>[]) {
    const data = await db.addItem(Type.name, items)
    return new Type(data)
}

export const getNotificationSlides = async () => {
    const servicesQuery = gql `services {
    }`
    const eventsQuery = gql `events {
    }`
    const milestonesQuery = gql `milestones {
    }`
    const birthdaysQuery = gql `birthday {
    }`
    const announcementsQuery = gql `announcements {
    }`

    const serviceSlide = await dbClient.get(servicesQuery)
    const eventSlide = await dbClient.get(eventsQuery)
    const milestoneSlide = await dbClient.get(milestonesQuery)
    const birthdaySlide = await dbClient.get(birthdaysQuery)
    const announcementSlide = await dbClient.get(announcementsQuery)
    return new Slides(serviceSlide, eventSlide, milestoneSlide, birthdaySlide, announcementSlide)
}

export const getServicesSlides = async () => {
    const prevServiceQuery = gql `service {

    }`
    const currentServiceQuery = gql `service {

    }`
    const nextServiceQuery = gql `service {

    }`
    const prevServiceSlide = await dbClient.get(prevServiceQuery)
    const currentServiceSlide = await dbClient.get(currentServiceQuery)
    const nextServiceSlide = await dbClient.get(nextServiceQuery)
    new Slides(prevServiceSlide, currentServiceSlide, nextServiceSlide)
}

export const getMilestones = async () => {
    const query = gql`milestones {

    }`
    const milestones = await dbClient.get(query)
    return milestones
}

export async function addModel <T extends IDataView> (clazz: new (...args: any[]) => T, parentView?: IDataView, id?: string, ...query: any) {
    let view
    const childView = new clazz();
    childView.id = childView.constructor.name
    const navList: NavList = new NavList({
        id: childView.id,
        sections: [],
        content: [
            {
                path: '/' + childView.id,
                name: childView.id
            }
        ],
        navType: 'top'
    })

    if (parentView) {
        view = await parentView.getListData(...query)
        view.sections.push(navList)
        view.children.push(childView)
    }
    else {
        if (id) {
            GlobalView.mainLayout.sections.forEach((view) => {
                if(isType(view,NavList) && view.id === id) {view.content.push(
                    {
                        path: '/' + childView.id,
                        name: childView.id
                    })}
            })
            GlobalView.mainLayout.children.push(childView)
        }
        else {
            GlobalView.mainLayout.sections.push(navList)
            GlobalView.mainLayout.children.push(childView)
        }
    }
    console.log("GlobalView: ", GlobalView)
    //const view2 = await childView.getListData()
}

export function getModel <T extends IDataView>(clazz: new (...args: any[]) => T): IDataView{
    const model = new clazz();
    model.id = model.constructor.name
    return model
}

export const models = [
    {
        name: 'group',
        val: new Group()
    }
]

/*export function addEntity<T>(classType: T) {
    entities.push(classType)
}*/
