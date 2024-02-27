import gql from "graphql-tag";
import { Action, DataType, View, QuestionType } from "../src/utils/types";
import { IDataView } from "./IDataView";
import { addModel, dbClient } from "../config/model";
import { RestClient, Callback, EmailType } from "@edifiles/services";
import { config } from "../public/config";
import { Member } from "./Member";
import { Group } from "./Group";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Relation} from "typeorm";

@Entity()
export class ReachOut implements IDataView {

  //@PrimaryGeneratedColumn()
  //id!: number;
  id = 'reachouts'

  @Column()
  title!: string;

  @ManyToOne(type => Member)
  sender!: Relation<Member>;

  @Column()
  message_type!: string;

  @Column()
  content!: string;

  @Column()
  send_option!: string;
    
    constructor() {
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

        const groupsQuery = gql `{
            group {
                id
                name
            }
        }`
        
        const members: Member[] = (await dbClient.get(membersQuery)).data?.data
        const groups: Group[] = (await dbClient.get(groupsQuery)).data?.data

        const options = [
            {
                label: 'groups',
                children: groups?.map((group) => {
                    return {
                        label: group.name,
                        id: group.id,
                    }
                }),
            },
            {
                label: 'members',
                children: members?.map((member) => {
                    return {
                        label: `${member.firstName} ${member.lastName}` ,
                        id: member.id,
                        avatar: member.avatar
                    }
                }),          
            }
        ]
        const form: QuestionType = {
            id: "",
            sections: [],
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
                    label: 'schedule',
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
                        schedule.fetch(config.backEndApi.requests.schedule(filledForm.sendOption.params(filledForm.sendOption.answer), filledForm.messageType.params(email)))
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
                    inputType: 'text',
                    name: 'title'
                },
                {
                    question: 'sender',
                    options: options,
                    name: 'senderId'
                },
                {
                    question: 'message type',
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
                    name: 'message_type'
                },
                {
                    question: 'content',
                    inputType: 'textarea',
                    name: 'content'
                },
                {
                    question: 'filter recipients by',
                    options: [
                        {
                            label: 'Attendance',
                            inputType: 'number',
                            params: (attendance: any)=> {
                                return gql`{
                                    serviceScore(total_attendance: ${attendance})
                                }`
                            }
                        },
                        {
                            label: 'Birthday',
                            inputType: 'date',
                            params: (date: any)=> {
                                return gql`{
                                    user(date_of_birth: ${date})
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

        const view: View = new View({
            sections: [form],
            id: "",
            size: '',
            navType: 'center',
            layout: "Grid"
        })
        return view
    }
    async getListData(senderUserId?: string, senderGroupId?: string, ...recipientIds: string[]) {
        const createReachOut: Action = new Action({
            label: 'Create',
            event: 'Route',
            args: {
                name: 'categories',
                params: {
                    categories: ['create']
                }
            },
        })
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
        let { data, error } = await new RestClient(config.api.ListMonk).get('/campaigns')
        let dataType: DataType = new DataType({
            sections: [], 
            id: '',
            items: {
                header: undefined,
                center: undefined,
                footer: undefined,
                left: undefined,
                right: undefined
            }
        })
        if (data)
        {dataType = new DataType({
            sections: [], 
            id: '',
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
        })}
        const view: View = new View({
            sections: [
                createReachOut,
                dataType
            ],
            id: "",
            layout: "Grid",
            size: '',
            navType: 'center'
        })
        return view
    }
}

//export const ro = new ReachOut()