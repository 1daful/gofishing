import { DocumentNode } from "graphql";
import { IDataView } from "./IDataView";
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
        })
    }
    
}