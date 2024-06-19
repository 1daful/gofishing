import { QueryFilter, QueryType } from "@edifiles/services";
import { Action, DataList, DataType, OptionsType, PageView, QuestionType, View } from "../src/utils/types";
import { IDataView } from "./IDataView";
import { dbClient, auth } from "../config/model";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, JoinTable, ManyToMany, Relation } from "typeorm";
import { Member } from "./Member";
import { Admin } from "./Admin";
import { getData } from "./DataView";
import { foreignColumns } from "@edifiles/services/dist/module/utility/Query";

export class Group implements IDataView {
    
  //@PrimaryGeneratedColumn()
  id: string = 'groups';

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

    async create(data?: any) {
        const adminGetQuery: QueryType = {
            name: "admin",
            columns: [
                'id', foreignColumns('member', ['firstName'])
            ],
            data: undefined
        }
        const adminData = await dbClient.get(adminGetQuery)
        const adminOptions: OptionsType[] = adminData.data.map((admin) => {
            return {
                id: admin.,
                meta: {

                }
            }
        })
        const form: QuestionType = new QuestionType ({
            id: "",
            title: "",
            index: 0,
            content: [
                {
                    question: 'name',
                    name: 'name',
                    inputType: 'text'
                },
                {
                    question: 'admin',
                    name: 'admin_id',
                    options
                }
            ],
            actions: {
                submit: new Action({
                    label: 'Create',
                    async event(filledForm: any) {
                        const user = await auth.getUser();
                        filledForm.admin_id = user.data.user?.id;
                        filledForm.id = filledForm.admin_id + new Date();
                        const groupQuery: QueryType = {
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
                        dbClient.post([groupQuery, adminQuery]);
                    }
                })
            },
            sections: []
        })

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
            name: "group",
            data: undefined,
            filters: filter,
            columns: []
        }

        const dataList: DataList = new DataList({
            id: "",
            sections: [],
            items: [],
            actions: [
                new Action({
                    label: 'Create',
                    icon: 'add',
                    event: 'Route',
                    viewGuard: true,
                    args: {
                        name: 'categories',
                        params: {
                            categories: ['create']
                        }
                    },
                })
            ]
        })

        //const data: Group[] = await dbClient.get(query)
        const dataType: DataType[] = await getData(query, (group: Group)=> {
            return new DataType({
                id: "",
                sections: [],
                items: {
                    header: [
                        {label: group.name}
                    ],
                    footer: [
                        {
                           action: new Action({
                                label: "Join a group",
                                async event() {
                                    const user = await auth.getUser()
                                    const query = {
                                        name: "group_member",
                                        data: {
                                            //user_id: useUser().user.id
                                            id: group.id,
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
        })
        dataList.items = dataType
        const view: PageView = new PageView({
            id: "group",
            layout: "Grid",
            sections: [dataList],
            children: []
        })
        return view
    }
    async getSingleData?(filter: any): Promise<PageView> {
        const query: QueryType = {
            name: "",
            data: undefined,
            filters: filter,
            columns: []
        }

        const data: Group = await dbClient.get(query)
        const singleDataItem = this.singleDataItem(data)
        const view: PageView = {
            id: "group",
            layout: "Grid",
            sections: [singleDataItem],
            children: []
        }
        return view
    }

    singleDataItem: Function = (data: Group)=> {
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

    /*listDataItems: Function = (data: Group[]) => {
        
        return dataType
    };*/
}