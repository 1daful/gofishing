import { DocumentNode } from "graphql";
import { DataType, FormType, QuestionType } from "../src/utils/types";
import { dbClient } from "../config/model";

export function getCreateData(...questionsData: {
    content: QuestionType,
    index: number
}[]) {
    const form: FormType = {
        name: "",
        actions: {},
        content: []
    }
    questionsData.forEach(element => {
        form.content[element.index] = element.content
    });
    return form
}

export async function getListData(name?: string, query?: DocumentNode) {
    const data = await dbClient.get('', query)
    const dataType: DataType = {
        items: {
            header: [
                {
                    label: data.name
                },
                {
                    label: data.createdAt.toString()
                },
                {
                    label: data.timeElapse.toString()
                }
            ],
            center: [
                {
                    component: data.content
                }
            ]
        }
    }
    return dataType
}

export async function getSingleData(query: DocumentNode) {
    const data = await dbClient.get(query)
    const items = {
        header: {
            name: {
                label: data.name
            },
            createdAt: {
                label: data.createdAt
            },
            timeElapse: {
                label: data.timeElapse
            }
        },
        center: {
            content: {
                component: data.content
            }
        }
    }
    return items
}
