import { dbClient } from "../config/model";
export function getCreateData(...questionsData) {
    const form = {
        name: "",
        actions: {},
        content: []
    };
    questionsData.forEach(element => {
        form.content[element.index] = element.content;
    });
    return form;
}
export async function getListData(name, query) {
    const data = await dbClient.get('', query);
    const dataType = {
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
    };
    return dataType;
}
export async function getSingleData(query) {
    const data = await dbClient.get('', query);
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
    };
    return items;
}
