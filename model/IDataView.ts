import { DataType, FormType, ViewSection, QuestionType } from "../src/utils/types"

export interface IDataView{
    id: any
    getCreateData?(data?: any): Promise<ViewSection>
    getListData(query?: any): Promise<ViewSection>
    getSingleData?(id: string ): Promise<ViewSection>
    singleDataItem?: Function
    listDataItems?: Function,
    newDataItem?: Function
}