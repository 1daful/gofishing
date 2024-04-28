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
    }
}
