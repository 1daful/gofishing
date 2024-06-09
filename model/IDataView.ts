<<<<<<< HEAD
import { DataType, FormType, ViewSection, QuestionType } from "../src/utils/types"

export interface IDataView{
    id: any
    getCreateData?(data?: any): Promise<ViewSection>
    getListData(query?: any): Promise<ViewSection>
    getSingleData?(id: string ): Promise<ViewSection>
=======
import { DataType, FormType, ViewSection, QuestionType, PageView } from "../src/utils/types"

export interface IDataView{
    id: any
    create?(data?: any): Promise<PageView>
    getListData(query?: any): Promise<PageView>
    getSingleData?(id: string ): Promise<PageView>
>>>>>>> master
    singleDataItem?: Function
    listDataItems?: Function,
    newDataItem?: Function
}