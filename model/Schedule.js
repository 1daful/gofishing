import gql from "graphql-tag";
import { dbClient } from "../config/model";
<<<<<<< HEAD
import { DataType } from "../src/utils/types";
=======
import { Action, DataType } from "../src/utils/types";
>>>>>>> master
import { Assignment } from "./Assignment";
export class Schedule {
    constructor(id) {
        this.id = id;
    }
<<<<<<< HEAD
    getCreateData(data) {
=======
    id;
    create(data) {
>>>>>>> master
        throw new Error("Method not implemented.");
    }
    async getListData() {
        const query = gql `schedule`;
<<<<<<< HEAD
        const data = await dbClient.get('', query);
        const dataType = new DataType({
            actionOverlay: this.getSingleData(data.id),
=======
        const data = await dbClient.get(query);
        const dataType = new DataType({
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
        });
<<<<<<< HEAD
        return dataType;
=======
        const view = {
            id: "",
            layout: "Grid",
            sections: [dataType],
            children: []
        };
        return view;
>>>>>>> master
    }
    getSingleData(id) {
        const assignment = new Assignment();
        return assignment.getSingleData(id);
    }
}
