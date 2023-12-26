import { DocumentNode } from "graphql"
import { DataType, FormType } from "../src/utils/types"

export interface IDataView{
    id: string
    getCreateData(data?: any): Promise<FormType>
    getListData(query?: any): Promise<DataType>
    getSingleData(id: string ): Promise<DataType>
}