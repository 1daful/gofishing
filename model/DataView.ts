import { DocumentNode } from "graphql";
import { Action, DataType, FormType, NavList, PageView, QuestionType, ViewSection, isType } from "../src/utils/types";
import { auth, dbClient } from "../config/model";
import { QueryFilter, QueryModifier, QueryType } from "@edifiles/services";
import { Client } from "@edifiles/services/dist/module/clients/Client";
import { IDataView } from "./IDataView";
import { GlobalView } from "../config/edifiles.config";

 export async function postData(query: string | QueryType, questionsData: QuestionType | FormType) {
    const view: PageView = new PageView({
        id: "",
        layout: "Grid",
        sections: [questionsData],
        children: []
    })
    return view
}
export async function getData(query: string | QueryModifier | QueryFilter | QueryType | QueryType[], callback: (data: any, ...args: [])=> ViewSection, client?: Client) {
    const useClient = client || dbClient
    let data = await useClient.get(query)
    let section: ViewSection[] = []
    if (data) {
        section = data.data?.map((dat: IDataView)=>{
            return callback(dat)
        })
    }
    /*const view: PageView = new PageView({
        id: "services",
        layout: "Grid",
        sections: [section],
        children: []
    })*/
    return section
}


export async function addModel <T extends IDataView> (clazz: new (...args: any[]) => T, parentView?: IDataView, id?: string, ...query: any) {
    let view
    const childView = new clazz();
    childView.id = childView.constructor.name
    const navList: NavList = new NavList({
        id: childView.id,
        sections: [],
        content: [
            {
                path: '/' + childView.id,
                name: childView.id
            }
        ],
        navType: 'top'
    })

    if (parentView) {
        view = await parentView.getListData(...query)
        view.sections.push(navList)
        view.children.push(childView)
    }
    else {
        if (id) {
            GlobalView.mainLayout.sections.forEach((view) => {
                if(isType(view,NavList) && view.id === id) {view.content.push(
                    {
                        path: '/' + childView.id,
                        name: childView.id
                    })}
            })
            GlobalView.mainLayout.children.push(childView)
        }
        else {
            GlobalView.mainLayout.sections.push(navList)
            GlobalView.mainLayout.children.push(childView)
        }
    }
    console.log("GlobalView: ", GlobalView)
    //const view2 = await childView.getListData()
}
