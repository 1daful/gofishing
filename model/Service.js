import gql from "graphql-tag";
import { dbClient } from "../config/model";
import { Action, DataType, FormType, QuestionType } from "../src/utils/types";
export class Service {
    async getCreateData() {
        const membersQuery = gql `member {
            firstName
            lastName
            avatar
        }`;
        const groupsQuery = gql `member {
            name
            members
            admins
        }`;
        const groupOptions = await dbClient.get('member', groupsQuery);
        const memberOptions = await dbClient.get('member', membersQuery);
        const options = [
            {
                label: 'members',
                data: memberOptions
            },
            {
                label: 'groups',
                data: groupOptions
            }
        ];
        const form = new FormType('Service', 'Submit', [
            new QuestionType({
                title: "Create new service",
                index: 0,
                actions: {},
                content: [{
                        question: 'name',
                        answer: '',
                        name: 'name',
                        inputType: 'text'
                    }, {
                        question: 'schedule',
                        answer: '',
                        name: '',
                        inputType: 'date'
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
            })
        ]);
        return form;
    }
    async getListData(dataArg) {
        var _a;
        let dataType = {
            items: {}
        };
        let data;
        if (dataArg) {
            data = dataArg;
        }
        else {
            data = await dbClient.get('service');
        }
        if (data) {
            dataType = {
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
                                event: 'route',
                                args: data.id,
                                onResult: [],
                                onError: []
                            })
                        }
                    ]
                }
            };
        }
        return dataType;
    }
    async getSingleData(id, argData) {
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
        if (id) {
            const query = gql `service (id: ${id})`;
            data = await dbClient.get('', query);
        }
        else {
            data = argData;
        }
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
                        new Action({
                            icon: 'video',
                            event: 'modal',
                            args: 'video',
                            onResult: [],
                            onError: []
                        }),
                        new Action({
                            icon: 'share',
                            event: 'modal',
                            args: 'share',
                            onResult: [],
                            onError: []
                        }),
                        new Action({
                            icon: 'pencil',
                            event: 'route',
                            args: {
                                path: '/service',
                                query: JSON.stringify(await this.getCreateData())
                            },
                            onResult: [],
                            onError: []
                        }),
                        {
                            label: getStatus()
                        }
                    ]
                }
            });
        }
        return dataType;
    }
}
export const serviceModel = new Service();
