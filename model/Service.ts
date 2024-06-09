import gql from "graphql-tag";
import { auth, dbClient } from "../config/model";
import { Action, DataList, DataType, PageView, QuestionType, View } from "../src/utils/types";
import { Share } from "../service/shareSrv";
import EUpload from "../src/components/EUpload.vue";
import { DocumentNode } from "graphql";
import { IDataView } from "./IDataView";
import { Member } from "./Member";
import { Group } from "./Group";
import { Event } from "./Event";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, Relation } from 'typeorm';
import { QueryFilter, QueryModifier, QueryType } from "@edifiles/services";
import { filter, foreignColumns } from "@edifiles/services/dist/module/utility/Query";
<<<<<<< HEAD
=======
import { getData } from "./DataView";
import { date } from "quasar";
>>>>>>> master

@Entity()
export class Service implements IDataView {

    @PrimaryGeneratedColumn('uuid')
    id: string = 'services';

    @Column()
    name!: string;

    @Column('jsonb', { nullable: true })
    anchors!: any[];

    @ManyToOne(() => Member, member => member.services)
    author!: Relation<Member>;

    @CreateDateColumn({ type: 'timestamp' })
<<<<<<< HEAD
    createdAt!: Date;
=======
    created_at!: Date;
>>>>>>> master

    @Column()
    content!: string;

    @Column({ type: 'int' })
    timeElapse!: number;

    @Column({ type: 'timestamp' })
    date!: Date;

    @OneToMany(() => Event, event => event.service)
    events!: Relation<Event[]>;

    view: View = {
        sections: [EUpload],
        id: "videoView",
        layout: "Grid",
        size: "",
        navType: "top"
    }
<<<<<<< HEAD
    async getCreateData() {
=======
    async create() {
>>>>>>> master
        /*const membersQuery = gql `{
            member {
                id
                firstName
                lastName
                avatar
            }
        }`*/

        /*const groupsQuery = gql `{
            group {
                id
                name
                member
            }
        }`
        */
        /*const groupsQuery:QueryType = {
            name: "",
            data: undefined,
            columns: [
                'id', 'name', foreignColumns('member', ['firstName', 'lastName', 'id', 'avatar'])
            ]
        }
        const groups: Group[] = await dbClient.get(groupsQuery)
        const members: Member[] = await dbClient.get(membersQuery)*/
        /*const options = [
            {
                label: 'groups',
                children: groups.map((group) => {
                    return {
                        label: group.name,
                        id: group.id,
                    }
                }),
            },
            {
                label: 'members',
                children: members.map((member) => {
                    return {
                        label: `${member.firstName} ${member.lastName}` ,
                        id: member.id,
                        avatar: member.avatar
                    }
                }),          
            }
        ]*/
        const userId = (await auth.getUser()).data.user?.id
<<<<<<< HEAD
=======
        let id
>>>>>>> master
        const form: QuestionType = new QuestionType({
            title: "Create new service",
            id: '',
            index: 1,
            sections: [],
            actions: {
                submit: new Action({
<<<<<<< HEAD
                    label: "Submit",
                    event(filledForm: any) {
                        const service = {
                            name: filledForm.name,
                            created_at: new Date().toUTCString(),
                            author_id: userId
=======
                    label: "Create",
                    async event(filledForm: any) {
                        const service = {
                            name: filledForm.name,
                            created_at: new Date().toUTCString(),
                            //created_at: date,
                            author_id: userId,
                            day: filledForm.day,
                            startTime: filledForm.startTime,
                            endTime: filledForm.endTime
>>>>>>> master
                        }

                        const query: QueryType = {
                            name: 'service',
                            data: service,
                        }
                        //dbClient.post(gql`{service (data: ${service})}`)
<<<<<<< HEAD
                        dbClient.post(query)
                    }
                })
=======
                        const { data, error } = await dbClient.post(query)
                        id = data.data[0].id
                        return {data, error}
                    },
                    onResult: {
                        redirect: {
                            name: 'id',
                            param: {
                                id
                            }
                        }
                    }
                }),
                /*addEvent: {
                    label: 'Add Event',
                    event: 'Modal',
                    args: new Event().create()
                }*/
>>>>>>> master
            },
            content: [{
                question: 'name',
                name: 'name',
                inputType: 'text'
            },
<<<<<<< HEAD
            /*{
                question: 'anchors',
                name: 'anchors',
                //options: options
            }*/]
        })
            
        const view: View = new View({
            id: "createService",
            layout: "Grid",
            sections: [form],
            size: '',
            navType: 'center'
=======
            {
                question: 'day',
                name: 'day',
                inputType: 'text'
                //options: options
            },
            {
                question: 'start',
                name: 'start_time',
                inputType: 'time'
            },
            {
                question: 'end',
                name: 'end_time',
                inputType: 'time'
            }
        ]
        })
            
        const view: PageView = new PageView({
            id: "createService",
            layout: "Grid",
            sections: [form],
            children: []
>>>>>>> master
        })
        return view
    }

    async getListData(query?: QueryType | QueryFilter | QueryModifier, dataArg?: any) {
        //const query = gql `service (id: ${id})`
<<<<<<< HEAD
        let dataList: DataList = new DataList({
            items: [],
=======
        const useQuery = query || 'service'
        //const eventQuery = 'event'
        let dataList: DataList = new DataList({
            items: [],  
>>>>>>> master
            actions: [
                new Action({
                    label: 'Create',
                    icon: 'add',
                    event: 'Route',
<<<<<<< HEAD
=======
                    viewGuard: true,
>>>>>>> master
                    args: {
                        name: 'categories',
                        params: {
                            categories: ['create']
                        }
                    },
                })
            ]
        })
        let data
        if(dataArg) {
            data = dataArg
        }
        else {
            if (query) {
                data = await dbClient.get(query)
            }
            else {
                data = await dbClient.get('service')
            }
        }
        if (data) {
<<<<<<< HEAD
            const items = data.data?.map((dat)=>{
=======
            /*const items = data.data?.map((dat)=>{
>>>>>>> master
                return new DataType({
                    id: '',
                    sections: [],
                    items: {
                        header: [
                            {
                                label: dat.name
                            },
                            {
                                label: dat.created_at?.toString()
                            },
                        ],
                        footer: [
                            {
                                action: new Action({
                                    label: 'open',
                                    event: 'Route',
                                    args: {
                                        name: 'id',
                                        params: {
                                            id: dat.id
                                        }
                                    },
<<<<<<< HEAD
                                    viewGuard: true
=======
>>>>>>> master
                                })
                            }
                        ]
                    }
                })
<<<<<<< HEAD
            })
            dataList.items = items
        }
        const view: View = new View({
            id: "services",
            layout: "Grid",
            sections: [dataList],
            size: '',
            navType: 'center'
=======
            })*/
        }
        const items: DataType[] = await getData(useQuery, (dat: Service)=> {
            return new DataType({
                id: '',
                sections: [],
                items: {
                    header: [
                        {
                            label: dat.name
                        },
                        {
                            //label: dat.created_at?.toLocaleString()
                            label: date.formatDate(dat.created_at, 'YYYY-MM-DD, HH:mm A')
                        },
                    ],
                    footer: [
                        {
                            action: new Action({
                                label: 'open',
                                event: 'Route',
                                args: {
                                    name: 'id',
                                    params: {
                                        id: dat.id
                                    }
                                },
                            })
                        }
                    ]
                }
            }) 
        })
        dataList.items = items
        const view: PageView = new PageView({
            id: "services",
            layout: "Grid",
            sections: [dataList],
            children: []
>>>>>>> master
        })
        return view
    }

    async getSingleData(id?: string, query?: QueryType, argData?: any) {
        const share = new Share()
        let eventQuery: QueryType

        if (id) {
            eventQuery = {
                name: "event",
                data: undefined,
                filters: [
                    {
                        op: 'eq',
                        col: 'service_id',
                        val: id
                    }
                ]
            }
        }
        else if (query) {
            eventQuery = query
        }
        const event = new Event()
        const eventView = await event.getListData(eventQuery)
        let dataType: DataType = {
            items: {
                header: undefined,
                center: undefined,
                footer: undefined,
                left: undefined,
                right: undefined
            },
            sections: [],
            id: ''
        }
        let data
        if (argData) {
            data = argData
        }
        else {
            let serviceQuery: QueryType
            if(id) {
                serviceQuery = {
                    name: 'service',
                    data: undefined,
                    filters: [
                        {
                            op: 'eq',
                            col: 'id',
                            val: id
                        }
                    ]
                }
            }
            else if (query) {
                serviceQuery = query
            }
            data = await dbClient.get(serviceQuery)
        }
        const items = data.data[0]
        let media = {
            url: '',
            description: items.content,
            thumbnail: items.name,
            title: items.name
        }
        const getStatus = () => {
            const now = new Date()
            let status = ''
            if (now >= items.start && now <= items.end) {
                status = 'active'
            }
            if (now > items.end) {
                status = 'ended'
            }
            if (now < items.start) {
                status = 'scheduled'
            }
            return status
        }
        dataType = new DataType({
            id: '',
            sections: [],
            items: {
                header: [
                    {
                        label: items.name
                    },
                    {
                        label: items.createdAt
                    },
                    {
                        label: items.timeElapse
                    }
                ],
                center: [
                    (await eventView).sections
                ],
                footer: [
                    {
                        action: 
                        new Action({
                            icon: 'videocam',
                            label: 'Add video',
                            event: 'Modal',
                            args: this.view,
                        }),
                    },
                    {
                        action: share.getShare(media),
                    },
                    {
                        action: 
                        new Action({
<<<<<<< HEAD
                            label: 'edit',
                            icon: 'edit',
                            event() {
=======
                            label: 'Edit',
                            icon: 'edit',
                            event() {
                                const { data, error } = { data: true, error: false}
                                return { data, error }
>>>>>>> master
                            },
                        })
                    },
                    {
                        label: getStatus()
                    }
                ]
            }
        })
<<<<<<< HEAD
        const view: View = new View({
=======
        const view: PageView = new PageView({
>>>>>>> master
            id: data.id,
            layout: "Grid",
            sections: [
                dataType,
                eventView
            ],
<<<<<<< HEAD
            size: '',
            navType: 'center'
=======
            children: []
>>>>>>> master
        })
        return view
    }
}