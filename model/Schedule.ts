import gql from "graphql-tag";
import { IDataView } from "./IDataView";
import { dbClient } from "../config/model";
<<<<<<< HEAD
import { DataType } from "../src/utils/types";
=======
import { Action, DataType, PageView } from "../src/utils/types";
>>>>>>> master
import { Assignment } from "./Assignment";

export class Schedule implements IDataView {
    constructor(id: string) {
        this.id = id
    }
    id: string;
<<<<<<< HEAD
    getCreateData(data?: any) {
=======
    create(data?: any) {
>>>>>>> master
        throw new Error("Method not implemented.");
    }
    async getListData() {
        const query = gql`schedule`
<<<<<<< HEAD
        const data = await dbClient.get('', query)
        const dataType: DataType = new DataType({
            actionOverlay: this.getSingleData(data.id),
=======
        const data = await dbClient.get(query)
        const dataType: DataType = new DataType({
            id: "",
            actionOverlay: new Action({
                event: this.getSingleData,
                args: data.id
            }),
            sections: [],
>>>>>>> master
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
<<<<<<< HEAD
        return dataType
=======
        const view: PageView = {
            id: "",
            layout: "Grid",
            sections: [dataType],
            children: []
        }
        return view
>>>>>>> master
    }
    getSingleData(id: string) {
        const assignment = new Assignment()
        return assignment.getSingleData(id)
    }
    
}