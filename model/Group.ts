import { QueryType } from "@edifiles/services";
import { Action, DataType, PageView } from "../src/utils/types";
import { IDataView } from "./IDataView";
import { dbClient, auth } from "../config/model";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, JoinTable, ManyToMany, Relation } from "typeorm";
import { Member } from "./Member";
import { Admin } from "./Admin";

export class Group implements IDataView {
    
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @Column()
  coordinator!: string;

  @Column()
  creator!: string;

  @ManyToMany(() => Member, (member) => member.groups)
  @JoinTable()
  members!: Relation<Member[]>;

  @ManyToMany(() => Admin, (admin) => admin.groups)
  @JoinTable()
  admins!: Relation<Admin[]>;

    getCreateData?(data?: any): Promise<PageView> {
        throw new Error("Method not implemented.");
    }
    
    async getListData(filter?: any): Promise<PageView> {
        const query: QueryType = {
            name: "",
            data: undefined,
            filter: filter,
            columns: []
        }

        const data: Group[] = await dbClient.get(query)
        const dataType: DataType = new DataType({
            items: {
                header: data.map((group) => {
                    return {label: group.name}
                }),
                footer: [
                    {
                        action: new Action({
                            label: "Join a group",
                            async event() {
                                const user = await auth.getUser()
                                const query = {
                                    name: "group",
                                    data: {
                                        //user_id: useUser().user.id
                                        id: data.id,
                                        user_id: user.id
                                    },
                                    filter: [],
                                }
                                dbClient.post(query)
                            }
                        })
                    }
                ]
            }
        })

        const view: PageView = {
            id: "group",
            layout: "Grid",
            sections: [dataType],
            children: []
        }
        return view
    }
    async getSingleData?(filter: any): Promise<PageView> {
        const query: QueryType = {
            name: "",
            data: undefined,
            filter: filter,
            columns: []
        }

        const data: Group = await dbClient.get(query)
        const dataType: DataType = new DataType({
            items: {
                header: [
                    {
                        label: data.name
                    }
                ],
                center: data.members.map((member)=> {
                    return {
                        label: `${member.firstName} ${member.lastName}`
                    }
                })
            }
        })

        const view: PageView = {
            id: "group",
            layout: "Grid",
            sections: [dataType],
            children: []
        }
        return view
    }

}