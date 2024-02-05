import gql from "graphql-tag";
import { dbClient } from "../config/model";
import { Action, DataType, PageView, QuestionType, View } from "../src/utils/types";
import { Share } from "../service/shareSrv";
import EUpload from "../src/components/EUpload.vue";
import { DocumentNode } from "graphql";
import { IDataView } from "./IDataView";
import { Member } from "./Member";
import { Group } from "./Group";

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, Relation } from 'typeorm';
import { Event } from './Event';
import { QueryType } from "@edifiles/services";
import { filter, foreignColumns } from "@edifiles/services/dist/module/utility/Query";

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
    createdAt!: Date;

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
    async getCreateData() {
        const membersQuery = gql `{
            member {
                id
                firstName
                lastName
                avatar
            }
        }`

        /*const groupsQuery = gql `{
            group {
                id
                name
                member
            }
        }`
        */
        const groupsQuery:QueryType = {
            name: "",
            data: undefined,
            filter: [],
            columns: [
                'id', 'name', foreignColumns('member', ['firstName', 'lastName', 'id', 'avatar'])
            ]
        }
        const groups: Group = await dbClient.get(groupsQuery)
        const members: Member = await dbClient.get(membersQuery)
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

        const form: QuestionType = new QuestionType({
            title: "Create new service",
            id: '',
            index: 1,
            actions: {
                submit: new Action({
                    label: "Submit",
                    event(filledForm: any) {
                        const service = {
                            name: filledForm.name,
                        }
                        const query: QueryType = {
                            name: 'service',
                            data: service,
                            filter: [],
                            columns: []
                        }
                        //dbClient.post(gql`{service (data: ${service})}`)
                        dbClient.post(query)
                    }
                })
            },
            content: [{
                question: 'name',
                answer: '',
                name: 'name',
                inputType: 'text'
            },
            {
                question: 'anchors',
                answer: '',
                name: 'anchors',
                //options: options
            }]
        })
            
        const view: PageView = {
            id: "createService",
            layout: "Grid",
            sections: [form],
            children: []
        }
        return view
    }

    async getListData(filters?: DocumentNode, dataArg?: any) {
        //const query = gql `service (id: ${id})`
        let dataType: DataType = {
            items: {
                header: undefined,
                center: undefined,
                footer: undefined,
                left: undefined,
                right: undefined
            }
        }
        let data
        if(dataArg) {
            data = dataArg
        }
        else {
            if (filters) {
                data = await dbClient.get(filters)
            }
            else {
                data = await dbClient.get('service')
            }
        }
        if (data) { 
            dataType = new DataType({
                items: {
                    header: [
                        {
                            label: data.name
                        },
                        {
                            label: data.createdAt?.toString()
                        },
                    ],
                    center: [
                        {
                            component: data.content
                        }
                    ],
                    footer: [
                        {
                            action: new Action({
                                label: 'open',
                                event: 'Route',
                                args: {
                                    name: 'id',
                                    params: {
                                        id: data.id
                                    }
                                },
                            })
                        }
                    ]
                },
                actions: [
                    new Action({
                        label: 'Create',
                        icon: 'add',
                        event: 'Route',
                        args: {
                            name: 'categories',
                            params: {
                                categories: ['create']
                            }
                        },
                    })
                ]
            })
        }
        const view: PageView = {
            id: "services",
            layout: "Grid",
            sections: [dataType],
            children: []
        }
        return view
    }

    async getSingleData(id?: string, filters?: DocumentNode, argData?: any) {
        const share = new Share()
        let dataType: DataType = {
            items: {
                header: undefined,
                center: undefined,
                footer: undefined,
                left: undefined,
                right: undefined
            }
        }
        let data: {
            id: string; start: Date; end: Date; name: any; createdAt: any; timeElapse: any; content: any; 
}
        if (argData) {
            data = argData
        }
        else {
            let query
            if(id) {
                query = gql `{service (id: ${id})}`
            }
            else if (filters) {
                query = filters
            }
            data = await dbClient.get(query)
        }
        let media = {
            url: '',
            description: data.content,
            thumbnail: data.name,
            title: data.name
        }
        const getStatus = () => {
            const now = new Date()
            let status = ''
            if (now >= data.start && now <= data.end) {
                status = 'active'
            }
            if (now > data.end) {
                status = 'ended'
            }
            if (now < data.start) {
                status = 'scheduled'
            }
            return status
        }
        if (data) {
            dataType = new DataType({
                items: {
                    header: [
                        {
                            label: data.name
                        },
                        {
                            label: data.createdAt
                        },
                        {
                            label: data.timeElapse
                        }
                    ],
                    center: [
                        {
                            component: data.content
                        }
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
                                label: 'edit',
                                icon: 'edit',
                                event() {
                                },
                            })
                        },
                        {
                            label: getStatus()
                        }
                    ]
                }
            })
        }
        const view: PageView = {
            id: data.id,
            layout: "Grid",
            sections: [dataType],
            children: []
        }
        return view
    }
}