import gql from "graphql-tag";
import { dbClient } from "../config/model";
import { Action, DataType, FormType, PageView, QuestionType } from "../src/utils/types";
import { Share } from "../service/shareSrv";

export class Service {
    /*id: string
    name: string;
    anchors: [];
    parent: Service;
    author: MemberList;
    createdAt: DateLocale;
    content: string
    timeElapse: number
    date: DateLocale*/
    id: string = 'services'
    async getCreateData() {
        const membersQuery = gql `{
            member {
                firstName
                lastName
                avatar
            }
        }`

        const groupsQuery = gql `{
            member {
                name
                members
                admins
            }
        }`
        
        const groupOptions = await dbClient.get('member', groupsQuery)
        const memberOptions = await dbClient.get('member', membersQuery)
        const options = [
            {
                label: 'members',
                data: memberOptions
            },
            {
                label: 'groups',
                data: groupOptions
            }
        ]

        const form: FormType = new FormType('Service', 'Submit', [
            new QuestionType({
                title: "Create new service",
                index: 0,
                actions: {},
                content: [{
                    question: 'name',
                    answer: '',
                    name: 'name',
                    inputType: 'text'
                },{
                    question: 'schedule',
                    answer: '',
                    name: '',
                    inputType: 'date'
                },{
                    question: 'anchors',
                    answer: '',
                    name: 'anchors',
                    options: options
                },{
                    question: 'content',
                    answer: '',
                    name: 'content',
                    inputType: 'textarea'
                },]
            })
        ])
        const view: PageView = {
            id: "createService",
            layout: "Grid",
            sections: [form],
            children: []
        }
        return view
    }

    async getListData(dataArg?: any) {
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
            data = await dbClient.get('service')
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
                                args: data.id,
                                onResult: [],
                                onError: []
                            })
                        }
                    ]
                },
                actions: [
                    new Action({
                        label: 'Create',
                        event: 'Route',
                        args: '/create',
                        onResult: [],
                        onError: []
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

    async getSingleData(id: string, argData?: any) {
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
            const query = gql `{service (id: ${id})}`
            data = await dbClient.get('', query)
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
                        new Action({
                            icon: 'video',
                            event: 'Modal',
                            args: 'video',
                            onResult: [],
                            onError: []
                        }),
                        share.getShare(media),
                        new Action({
                            label: 'edit',
                            icon: 'pencil',
                            event: 'Route',
                            args: {
                                name: 'services',
                            },
                            onResult: [],
                            onError: []
                        }),
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