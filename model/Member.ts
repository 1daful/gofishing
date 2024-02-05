import { DataType, PageView, QuestionType } from "../src/utils/types"
import { IDataView } from "./IDataView"
import { getCreateData, getListData } from "./DataView"
import { dbClient } from "../config/model"
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, OneToOne, Relation } from "typeorm"
import { QueryType } from "@edifiles/services"
import { filter } from "@edifiles/services/dist/module/utility/Query"
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
            filter: [filter('eq', "id", id)],
            columns: []
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

        const view: PageView = {
            sections: [dataType],
            id: "",
            layout: "Grid",
            children: [groupView]
        }
        return view
        //return await getSingleData(query)
    }

    //overlay!: string
   // card = true

    async getCreateData(image: string) {
        const data = new QuestionType({
            title: 'Add new member data',
            index: 0,
            actions: {},
            content: [
                {
                    question: '',
                    answer: '',
                    image: image,
                    name: 'avatar'
                },
                {
                    question: 'first name',
                    inputType: 'text',
                    answer: '',
                    name: 'firstName'
                },
                {
                    question: 'last name',
                    inputType: 'text',
                    answer: '',
                    name: 'lastName'
                },
                {
                    question: 'email',
                    inputType: 'email',
                    answer: '',
                    name: 'email'
                },
                {
                    question: 'phone number',
                    inputType: 'tel',
                    answer: '',
                    name: 'phoneNumber'
                },
                {
                    question: 'address',
                    inputType: 'text',
                    answer: '',
                    name: 'address'
                }
            ]
        })

        const form = getCreateData({
            content: data,
            index: 1
        })

        const view: PageView = {
            id: "",
            layout: "Grid",
            sections: [form],
            children: []
        }
        return view
    }

    
    async getListData(filters?: any) {
        let query: QueryType = {
            name: "member",
            data: undefined,
            filter: filters,
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
        const view: PageView = {
            sections: [dataType],
            id: "",
            layout: "Grid",
            children: []
        }
        return view
    }
}