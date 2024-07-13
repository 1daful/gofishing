<<<<<<< HEAD
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
    const data = await dbClient.get(query);
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
=======
import { NavList, PageView, isType } from "../src/utils/types";
import { dbClient } from "../config/model";
import { GlobalView } from "../config/edifiles.config";
export async function postData(query, questionsData) {
    const view = new PageView({
        id: "",
        layout: "Grid",
        sections: [questionsData],
        children: []
    });
    return view;
}
export async function getData(query, callback, client) {
    const useClient = client || dbClient;
    let data = await useClient.get(query);
    let section = [];
    if (data) {
        section = data.data?.map((dat) => {
            return callback(dat);
        });
    }
    return section;
}
export async function addModel(clazz, parentView, id, ...query) {
    let view;
    const childView = new clazz();
    childView.id = childView.constructor.name;
    const navList = new NavList({
        id: childView.id,
        sections: [],
        content: [
            {
                path: '/' + childView.id,
                name: childView.id
            }
        ],
        navType: 'top'
    });
    if (parentView) {
        view = await parentView.getListData(...query);
        view.sections.push(navList);
        view.children.push(childView);
    }
    else {
        if (id) {
            GlobalView.mainLayout.sections.forEach((view) => {
                if (isType(view, NavList) && view.id === id) {
                    view.content.push({
                        path: '/' + childView.id,
                        name: childView.id
                    });
                }
            });
            GlobalView.mainLayout.children.push(childView);
        }
        else {
            GlobalView.mainLayout.sections.push(navList);
            GlobalView.mainLayout.children.push(childView);
        }
    }
    console.log("GlobalView: ", GlobalView);
>>>>>>> master
}
