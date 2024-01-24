import gql from "graphql-tag";
import { Action, DataType, PageView, QuestionType } from "../src/utils/types";
import { IDataView } from "./IDataView";
import { addModel, dbClient } from "../config/model";
import { RestClient, Callback, EmailType } from "@edifiles/services";
import { config } from "../public/config";

export class ReachOut implements IDataView {
    constructor() {
        addModel(this, undefined, "mainMenu")
    }
    id: string =  'reachout'
    async getCreateData() {
        const membersQuery = gql `{
            member {
                id
                firstName
                lastName
                avatar
            }
        }`

        const groupsQuery = gql `{
            group {
                id
                name
            }
        }`
        
        const members = await dbClient.get(membersQuery)
        const groups = await dbClient.get(groupsQuery)

        const options = [
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
        ]
        const form: QuestionType = {
            title: "",
            index: 0,
            compute(filledForm: any) {
                //const rest: RestClient = new RestClient(config.backURL)
                const email: EmailType = {
                    name: filledForm.title,
                    subject: "",
                    text: "",
                    templateKey: "",
                    html: filledForm.content,
                    date: new Date(),
                    attachments: [],
                    inline_images: [],
                    headers: [],
                    messenger: filledForm.messenger,
                    body: filledForm.content
                }
                return { email }
            },
            actions: {
                submit: new Action({
                    event(filledForm: any) {
                        //const rest: RestClient = new RestClient(config.backURL)
                        const email: EmailType = {
                            name: filledForm.title,
                            subject: "",
                            text: "",
                            templateKey: "",
                            html: filledForm.content,
                            date: new Date(),
                            attachments: [],
                            inline_images: [],
                            headers: [],
                            messenger: filledForm.messenger,
                            body: filledForm.content
                        }
                        const schedule = new Callback(config.backEndApi)
                        schedule.post(config.backEndApi.requests.schedule(filledForm.sendOption.params(filledForm.sendOption.answer), filledForm.messageType.params(email)))
                        /*switch (filledForm.sendOption) {
                            case 'attendance':
                                const attendanceQuery = gql`{
                                    serviceScore(totalAttendance: ${filledForm.sendOption.})
                                }`
                                let rest: RestClient = new RestClient(config.backURL)
                                rest.post('schedule', {
                                    query: attendanceQuery,
                                    run: {
                                        url: config.api.ListMonk.baseUrl,
                                        params: config.api.ListMonk.config.baseParams
                                    }
                                })
                                break;
                            case "Birthday":
                                const BirthdayQuery = gql`{
                                    user(dateOfBirth: ${new Date()})
                                }`
                                break;
                            default:
                                break;
                        }*/
                    }
                })
            },
            content: [
                {
                    question: 'title',
                    answer: '',
                    inputType: 'text',
                    name: 'title'
                },
                {
                    question: 'sender',
                    answer: '',
                    options: options,
                    name: 'senderId'
                },
                {
                    question: 'message type',
                    answer: '',
                    options: [
                        {
                            label: 'sms',
                            params: config.api.Infobip.request.sms
                        },
                        {
                            label: 'email',
                            params: config.api.ListMonk.requests.campaign
                        },
                        'notification'
                    ],
                    name: 'messageType'
                },
                {
                    question: 'content',
                    answer: '',
                    inputType: 'textarea',
                    name: 'content'
                },
                {
                    question: 'filter recipients',
                    answer: '',
                    options: [
                        {
                            label: 'Attendance',
                            inputType: 'number',
                            params: (attendance: any)=> {
                                return gql`{
                                    serviceScore(totalAttendance: ${attendance})
                                }`
                            }
                        },
                        {
                            label: 'Birthday',
                            inputType: 'date',
                            params: (date: any)=> {
                                return gql`{
                                    user(dateOfBirth: ${date})
                                }`
                            }
                        },
                        {
                            label: 'Invitees',
                            children: [
                                {
                                    label: 'Before event',
                                    id: 0
                                },
                                {
                                    label: 'After event',
                                    id: 1
                                }
                            ]
                        }
                    ],
                    name: 'sendOption'
                }
            ]
        }

        const view: PageView = {
            sections: [form],
            id: "",
            children: [],
            layout: "Grid"
        }
        return view
    }
    async getListData(senderUserId?: string, senderGroupId?: string, ...recipientIds: string[]) {
        let query
        /*if (senderUserId) {
            query = gql`{
                message (sender_user_id: ${senderUserId})
            }`
        }
        else if (senderGroupId) {
            query = gql`{
                message (sender_group_id: ${senderGroupId})
            }`
        }
        if (recipientIds) {
            query = gql`{
                message (recipient_ids: ${recipientIds})
            }`
        }*/
        //const data2 = await dbClient.get('', query)
        const data = await new RestClient(config.api.ListMonk).get('/campaigns')
        const dataType: DataType = new DataType({
            actionOverlay: data.actionPoint, //the actionPoint takes us to take action on the message
            items: {
                header: [
                    {
                        label: data.title
                    }
                ],
                center: [
                    {
                        label: data.content
                    }
                ],
                footer: [
                    {
                        label: data.createdAt
                    },
                    {
                        label: data.sentAt
                    }
                ]
            }
        })
        const view: PageView = {
            sections: [dataType],
            id: "",
            layout: "Grid",
            children: []
        }
        return view
    }
}

//export const ro = new ReachOut()