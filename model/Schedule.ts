import gql from "graphql-tag";
import { IDataView } from "./IDataView";
import { dbClient } from "../config/model";
import { DataType } from "../src/utils/types";
import { Assignment } from "./Assignment";

export class Schedule implements IDataView {
    constructor(id: string) {
        this.id = id
    }
    id: string;
    getCreateData(data?: any) {
        throw new Error("Method not implemented.");
    }
    async getListData() {
        const query = gql`schedule`
        const data = await dbClient.get('', query)
        const dataType: DataType = new DataType({
            actionOverlay: this.getSingleData(data.id),
            items: {
                header: [
                    {
                        label: data.assignment.name
                    }
                ],
                center: [
                    {
                        label: data.start
                    },
                    {
                        label: data.end
                    },
                    {
                        label: data.cycle
                    }
                ],
                footer: [
                    {
                        label: data.author.firstName
                    },
                    {
                        label: data.author.lastName
                    }
                ],
                left: undefined,
                right: undefined
            }
        })
        return dataType
    }
    getSingleData(id: string) {
        const assignment = new Assignment()
        return assignment.getSingleData(id)
    }
    
}