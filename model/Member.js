import { QuestionType } from "../src/utils/types";
import { getCreateData, getSingleData, getListData } from "./DataView";
import gql from "graphql-tag";
export class MemberList {
    constructor(data) {
        this.card = true;
        Object.assign(this, data);
    }
    async getSingleData(id) {
        const query = gql `member (id: ${id})`;
        return await getSingleData(query);
    }
    getCreateData(image) {
        const data = new QuestionType({
            title: 'Add new member data',
            index: 0,
            actions: {},
            content: [
                {
                    question: '',
                    answer: '',
                    image: image,
                    name: 'avatar'
                },
                {
                    question: 'first name',
                    inputType: 'text',
                    answer: '',
                    name: 'firstName'
                },
                {
                    question: 'last name',
                    inputType: 'text',
                    answer: '',
                    name: 'lastName'
                },
                {
                    question: 'email',
                    inputType: 'email',
                    answer: '',
                    name: 'email'
                },
                {
                    question: 'phone number',
                    inputType: 'tel',
                    answer: '',
                    name: 'phoneNumber'
                },
                {
                    question: 'address',
                    inputType: 'text',
                    answer: '',
                    name: 'address'
                }
            ]
        });
        const form = getCreateData({
            content: data,
            index: 1
        });
        return form;
    }
    async getListData() {
        return await getListData('member');
    }
}
