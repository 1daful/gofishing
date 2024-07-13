import { DocumentNode } from "graphql";
import { IDataView } from "./IDataView";
import { getData } from "./DataView";
import gql from "graphql-tag";
import { DataList, DataType, PageView, ViewSection } from "../src/utils/types";
import { dbClient } from "../config/model";
import { QueryType } from "@edifiles/services";

export class Achievement implements IDataView {
    id = 'achievement'
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
    }
    
}