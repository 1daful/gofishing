import { DocumentNode } from "graphql";
import { IDataView } from "./IDataView";
<<<<<<< HEAD
import { getListData, getSingleData } from "./DataView";
import gql from "graphql-tag";
import { DataType } from "../src/utils/types";
import { dbClient } from "../config/model";

export class Achievement implements IDataView {
    getCreateData(data?: any) {
        throw new Error("Method not implemented.");
    }
    async getListData(userId: string) {
        const query = gql`achievement (user_id: ${userId})`
        return await getListData('', query)
    }
    async getSingleData(id: string) {
        const query = gql`achievement (id: ${id}) {
            id
            title
            achiever
            timestamp
        }`
        const data = await dbClient.get('', query)
        const dataType: DataType = new DataType({
=======
import { getData } from "./DataView";
import gql from "graphql-tag";
import { DataList, DataType, PageView, ViewSection } from "../src/utils/types";
import { dbClient } from "../config/model";
import { QueryType } from "@edifiles/services";

export class Achievement implements IDataView {
    create(data?: any) {
        throw new Error("Method not implemented.");
    }
    async getListData(userId: string) {
        //const query = gql`achievement (user_id: ${userId})`
        const items = await getData('achievement', (data)=> {
            return new DataType({
                id: '',
                items: {
                    header: []
                },
                sections: []
            })
        })

        const view: PageView = new PageView({
            id: "",
            layout: "Grid",
            sections: [
                new DataList({
                    id: '',
                    sections: [],
                    items: items
                })
            ],
            children: []
        })
        return view
    }
    async getSingleData(id: string) {
        const query: QueryType = {
            name: 'achievement',
            filters: [
                {
                    col: 'id',
                    val: id,
                    op: 'eq'
                }
            ],
            data: undefined
        }
        const data = await getData(query, (data) => {
            return new DataType({
>>>>>>> master
            items: {
                header: [
                    {
                        label: data.title
                    },
                    
                ],
                center: undefined,
                footer: undefined,
                left: undefined,
                right: undefined
<<<<<<< HEAD
            }
        })
=======
            },
            id: '',
            sections: []
        })
    })
    const view: PageView = new PageView({
        id: '',
        layout: 'Grid',
        sections: [
            data
        ],
        children: []
    })
    return view
>>>>>>> master
    }
    
}