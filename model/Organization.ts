import { QueryFilter, QueryType } from "@edifiles/services";
import { Action, DataType, PageView, QuestionType, View } from "../src/utils/types";
import { IDataView } from "./IDataView";
import { dbClient, auth } from "../config/model";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, JoinTable, ManyToMany, Relation } from "typeorm";
import { Member } from "./Member";
import { Admin } from "./Admin";

export class Organisation implements IDataView {
    
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

    async getCreateData(data?: any) {
        const form: QuestionType = {
            id: "",
            title: "",
            index: 0,
            content: [
                {
                    question: 'name',
                    name: 'name',
                    inputType: 'text'
                }   
            ],
            actions: {
                submit: new Action({
                    async event(filledForm: any) {
                        const user = await auth.getUser();
                        filledForm.admin_id = user.data.user?.id;
                        filledForm.id = filledForm.admin_id + new Date();
                        const orgganisationQuery: QueryType = {
                            name: "group",
                            data: filledForm,
                            columns: []
                        };
                        const admin = {
                            id: filledForm.admin_id,
                            group_id: filledForm.id
                        };
                        const adminQuery: QueryType = {
                            name: "admin",
                            data: admin
                        };
                        dbClient.post([orgganisationQuery, adminQuery]);
                    }
                })
            },
            sections: []
        }

        const view: PageView = new PageView({
            sections: [form],
            id: "",
            layout: "Grid",
            children: []
        })
        return view
    }
    
    async getListData(filter?: QueryFilter[]): Promise<PageView> {
        const query: QueryType = {
            name: "",
            data: undefined,
            filters: filter,
            columns: []
        }

        const data: Organisation[] = await dbClient.get(query)
        const dataType: DataType = this.listDataItems(data)

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
            filters: filter,
            columns: []
        }

        const data: Organisation = await dbClient.get(query)
        const singleDataItem = this.singleDataItem(data)
        const view: PageView = {
            id: "",
            layout: "Grid",
            sections: [singleDataItem],
            children: []
        }
        return view
    }

    singleDataItem = (data: Organisation)=> {
        const singleDataItem: DataType = new DataType({
            id: "",
            sections: [],
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
        return singleDataItem
    };

    listDataItems: Function = (data: Organisation[]) => {
        const dataType: DataType = new DataType({
            id: "",
            sections: [],
            items: {
                header: data.map((group) => {
                    return {label: group.name}
                }),
                footer: [
                    {
                       /* action: new Action({
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
                        })*/
                    }
                ]
            }
        })
        return dataType
    };
}