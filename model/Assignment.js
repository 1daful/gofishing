import { dbClient } from "../config/model";
import gql from "graphql-tag";
export class Assignment {
<<<<<<< HEAD
    async getCreateData() {
=======
    async create() {
>>>>>>> master
        const membersQuery = gql `member {
            firstName
            lastName
            avatar
        }`;
        const groupsQuery = gql `group {
            name
            members
            admins
        }`;
        const rolesQuery = gql `role {
            name
            delegate
        }`;
        const memberOptions = await dbClient.get('', membersQuery);
        const groupOptions = await dbClient.get('', groupsQuery);
        const roleOptions = await dbClient.get('', rolesQuery);
        const options = {
            groups: groupOptions,
            members: memberOptions,
            roles: roleOptions
        };
        const data = {
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
        };
    }
    getListData(query) {
    }
    getSingleData(id) {
        return;
    }
}
