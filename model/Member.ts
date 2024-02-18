import { DataType, PageView, QuestionType, View } from "../src/utils/types"
import { IDataView } from "./IDataView"
import { getCreateData, getListData } from "./DataView"
import { dbClient } from "../config/model"
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, OneToOne, Relation } from "typeorm"
import { QueryFilter, QueryType } from "@edifiles/services"
import { filter, foreignColumns } from "@edifiles/services/dist/module/utility/Query"
import { Group } from "./Group"
import { Session } from "./Session"
import { Invitation } from "./Invitation"
import { Service } from "./Service"
import { Admin } from "./Admin"
import { Attendance } from "./Attendance"

export class Member implements IDataView {
    @PrimaryGeneratedColumn()
    id!: number;
 
    @Column()
    firstName!: string;
 
    @Column()
    lastName!: string;
 
    @Column({ type: 'simple-array' }) // Specify array type for clarity
    contacts!: string[]; // Define data type for contacts
 
    @Column()
    address!: string; // Remove empty string default
 
    @CreateDateColumn()
    created_at!: Date;
 
    @UpdateDateColumn()
    updated_at!: Date;
 
    @Column({ type: 'timestamptz' }) // Clarify timestamp type
    lastTime!: Date;
 
    @Column({ nullable: true }) // Allow optional avatar
    avatar?: string; // Optional property using '?'
 
    // Establish relationships as needed (e.g., with Group entity)
    @ManyToMany(() => Group, (group) => group.members) // Defines a one-to-many relationship with the Member entity
    @JoinTable()
    groups!: Relation<Group[]>;
 
    @OneToMany(() => Invitation, (invitation) => invitation.sender)
     sentInvitations!: Relation<Invitation[]>
 
 
    @ManyToMany(() => Invitation, (invitation) => invitation.recipients)
    @JoinTable()
    receivedInvitations!: Relation<Invitation[]>;
 
    // Establish relationships as needed (e.g., with Group entity)
    @ManyToMany(() => Session, (session) => session.author) // Defines a one-to-many relationship with the Member entity
    @JoinTable()
    sessions!: Relation<Session[]>;

    @OneToMany(() => Service, (service) => service.author)
    services!: Relation<Service[]>

    @OneToOne(() => Admin, (admin) => admin.member)
    admin!: Relation<Admin>

    @OneToMany(() => Attendance, (attendance) => attendance.member)
    attendances!: Relation<Attendance>
    
    constructor(data: Record<string, any>) {
        Object.assign(this, data)
    }

    async getSingleData(id: string) {
        //const query = gql `member (id: ${id})`
        const groupView: PageView = new PageView({
            id: "",
            layout: "Grid",
            sections: [],
            children: []
        })
        const query: QueryType = {
            name: "member",
            data: undefined,
            filters: [{
                op: 'eq',
                col: 'id',
                val: id
            }]
        }
        const data: Member = await dbClient.get(query)
        const dataType: DataType = new DataType({
            //actionOverlay: data.actionPoint, //the actionPoint takes us to take action on the message
            items: {
                header: [
                    {
                        label: data.firstName,
                        avatar: data.avatar
                    },
                    {
                        label: data.lastName
                    }
                ],
                center: [
                    {
                        label: `Joined: ${data.created_at}`
                    },
                    {
                        label: `Last seen: ${data.created_at}`
                    }
                ]
            }
        })

        const view: View = {
            sections: [dataType],
            id: "",
            layout: "Grid",
            size: "",
            navType: "top"
        }
        return view
        //return await getSingleData(query)
    }

    //overlay!: string
   // card = true

    async getCreateData(image: string) {
        const data = new QuestionType({
            id: "",
            title: 'Add new member data',
            index: 0,
            actions: {},
            content: [
                {
                    question: '',
                    image: image,
                    name: 'avatar'
                },
                {
                    question: 'first name',
                    inputType: 'text',
                    name: 'firstName'
                },
                {
                    question: 'last name',
                    inputType: 'text',
                    name: 'lastName'
                },
                {
                    question: 'email',
                    inputType: 'email',
                    name: 'email'
                },
                {
                    question: 'phone number',
                    inputType: 'tel',
                    name: 'phoneNumber'
                },
                {
                    question: 'address',
                    inputType: 'text',
                    name: 'address'
                }
            ]
        })

        const form = getCreateData({
            content: data,
            index: 1
        })

        const view: View = {
            id: "",
            layout: "Grid",
            sections: [form],
            size: "",
            navType: "top"
        }
        return view
    }

    
    async getListData(filters?: QueryFilter[]) {
        let query: QueryType = {
            name: "member",
            data: undefined,
            filters: filters,
            columns: []
        }
        const data: Member = await dbClient.get(query)
        const dataType: DataType = new DataType({
            items: {
                header: [
                    {
                        avatar: data.avatar
                    },
                    {
                        label: `${data.firstName} ${data.lastName}`
                    }
                ],
                center: [
                    {
                        label: `Joined: ${data.created_at}`
                    },
                    {
                        label: `Last seen: ${data.lastTime}`
                    }
                ],
                footer: [
                ]
            }
        })
        const view: View = {
            sections: [dataType],
            id: "",
            layout: "Grid",
            size: "",
            navType: "top"
        }
        return view
    }

    getFirstTimers() {
        //const computedDate = new Date().setDate(new Date().getDate() - 7 * 24 * 60 * 60 * 1000)
        const firstTimerQuery: QueryType = {
            name: "member",
            data: undefined,
            filters: [
                {
                    op: 'eq',
                    col: 'attendance_count.count',
                    val: 1
                }
            ],
            columns: [
                foreignColumns('attendance_count', ['count'])
            ]
        }
        return firstTimerQuery
        /*gql`{
            member(firstTime: {gt:${
                computedDate
            } }) {
                firstName
                lastName
            }
        }`*/
    }
}