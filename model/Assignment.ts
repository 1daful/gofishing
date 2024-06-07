import { DocumentNode } from "graphql";
import { IDataView } from "./IDataView";
import { QuestionType } from "../src/utils/types";
import { dbClient } from "../config/model";
import gql from "graphql-tag";

export class Assignment implements IDataView {
    async create() {
        const membersQuery = gql `member {
            firstName
            lastName
            avatar
        }`

        const groupsQuery = gql `group {
            name
            members
            admins
        }`

        const rolesQuery = gql `role {
            name
            delegate
        }`
        
        const memberOptions = await dbClient.get('', membersQuery)
        const groupOptions = await dbClient.get('', groupsQuery)
        const roleOptions = await dbClient.get('', rolesQuery)

        const options = {
            groups: groupOptions,
            members: memberOptions,
            roles: roleOptions
        }
        

        const data: QuestionType = {
            title: "",
            index: 0,
            actions: {},
            content: [
                {
                    question: 'name',
                    inputType: 'text',
                    answer: '',
                    name: 'name'
                },
                {
                    question: 'delegate',
                    answer: '',
                    name: 'delegate',
                    options: options
                },
            ]
        }
    }
    getListData(query?: DocumentNode | undefined) {
    }
    getSingleData(id: string) {
        return 
    }
    
}