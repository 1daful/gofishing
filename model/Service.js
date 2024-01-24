import gql from "graphql-tag";
import { dbClient } from "../config/model";
import { Action, DataType, QuestionType } from "../src/utils/types";
import { Share } from "../service/shareSrv";
import EUpload from "../src/components/EUpload.vue";
export class Service {
    constructor() {
        this.id = 'services';
        this.view = {
            sections: [EUpload],
            id: "videoView",
            layout: "Grid",
            size: "",
            navType: "top"
        };
    }
    async getCreateData() {
        const membersQuery = gql `{
            member {
                id
                firstName
                lastName
                avatar
            }
        }`;
        const groupsQuery = gql `{
            member {
                id
                name
            }
        }`;
        const groups = await dbClient.get(groupsQuery);
        const members = await dbClient.get(membersQuery);
        const options = [
            {
                label: 'groups',
                children: groups.map((group) => {
                    return {
                        label: group.name,
                        id: group.id,
                    };
                }),
            },
            {
                label: 'members',
                children: members.map((member) => {
                    return {
                        label: `${member.firstName} ${member.lastName}`,
                        id: member.id,
                        avatar: member.avatar
                    };
                }),
            }
        ];
        const form = new QuestionType({
            title: "Create new service",
            index: 1,
            actions: {
                submit: new Action({
                    event(filledForm) {
                        const service = {
                            name: filledForm.name,
                            startAt: filledForm.startAt,
                            anchors: filledForm.anchors,
                            content: filledForm,
                        };
                        dbClient.post(gql `{service (data: ${service})}`);
                    }
                })
            },
            content: [{
                    question: 'name',
                    answer: '',
                    name: 'name',
                    inputType: 'text'
                }, {
                    question: 'schedule',
                    answer: '',
                    name: 'startAt',
                    inputType: 'schedule'
                }, {
                    question: 'anchors',
                    answer: '',
                    name: 'anchors',
                    options: options
                }, {
                    question: 'content',
                    answer: '',
                    name: 'content',
                    inputType: 'textarea'
                },]
        });
        const view = {
            id: "createService",
            layout: "Grid",
            sections: [form],
            children: []
        };
        return view;
    }
    async getListData(filters, dataArg) {
        var _a;
        let dataType = {
            items: {
                header: undefined,
                center: undefined,
                footer: undefined,
                left: undefined,
                right: undefined
            }
        };
        let data;
        if (dataArg) {
            data = dataArg;
        }
        else {
            if (filters) {
                data = await dbClient.get(filters);
            }
            else {
                data = await dbClient.get('service');
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
                            label: (_a = data.createdAt) === null || _a === void 0 ? void 0 : _a.toString()
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
            });
        }
        const view = {
            id: "services",
            layout: "Grid",
            sections: [dataType],
            children: []
        };
        return view;
    }
    async getSingleData(id, filters, argData) {
        const share = new Share();
        let dataType = {
            items: {
                header: undefined,
                center: undefined,
                footer: undefined,
                left: undefined,
                right: undefined
            }
        };
        let data;
        if (argData) {
            data = argData;
        }
        else {
            let query;
            if (id) {
                query = gql `{service (id: ${id})}`;
            }
            else if (filters) {
                query = filters;
            }
            data = await dbClient.get(query);
        }
        let media = {
            url: '',
            description: data.content,
            thumbnail: data.name,
            title: data.name
        };
        const getStatus = () => {
            const now = new Date();
            let status = '';
            if (now >= data.start && now <= data.end) {
                status = 'active';
            }
            if (now > data.end) {
                status = 'ended';
            }
            if (now < data.start) {
                status = 'scheduled';
            }
            return status;
        };
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
                            action: new Action({
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
                            action: new Action({
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
            });
        }
        const view = {
            id: data.id,
            layout: "Grid",
            sections: [dataType],
            children: []
        };
        return view;
    }
}
