import { PageView } from "../src/utils/types"

export interface IDataView{
    id: string
    getCreateData?(data?: any): Promise<PageView>
    getListData(query?: any): Promise<PageView>
    getSingleData?(id: string ): Promise<PageView>
}