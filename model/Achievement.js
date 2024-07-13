<<<<<<< HEAD
import { getListData } from "./DataView";
import gql from "graphql-tag";
import { DataType } from "../src/utils/types";
import { dbClient } from "../config/model";
export class Achievement {
    getCreateData(data) {
        throw new Error("Method not implemented.");
    }
    async getListData(userId) {
        const query = gql `achievement (user_id: ${userId})`;
        return await getListData('', query);
    }
    async getSingleData(id) {
        const query = gql `achievement (id: ${id}) {
            id
            title
            achiever
            timestamp
        }`;
        const data = await dbClient.get('', query);
        const dataType = new DataType({
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
            }
        });
=======
import { getData } from "./DataView";
import { DataList, DataType, PageView } from "../src/utils/types";
export class Achievement {
    create(data) {
        throw new Error("Method not implemented.");
    }
    async getListData(userId) {
        const items = await getData('achievement', (data) => {
            return new DataType({
                id: '',
                items: {
                    header: []
                },
                sections: []
            });
        });
        const view = new PageView({
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
        });
        return view;
    }
    async getSingleData(id) {
        const query = {
            name: 'achievement',
            filters: [
                {
                    col: 'id',
                    val: id,
                    op: 'eq'
                }
            ],
            data: undefined
        };
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
            });
        });
        const view = new PageView({
            id: '',
            layout: 'Grid',
            sections: [
                data
            ],
            children: []
        });
        return view;
>>>>>>> master
    }
}
