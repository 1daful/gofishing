import { FormType, DataType, PageView } from "../src/utils/types";
import { IDataView } from "./IDataView";
export class VideoShare implements IDataView {
    getCreateData?(data?: any): Promise<PageView> {
        throw new Error("Method not implemented.");
    }
    getListData(query?: any): Promise<PageView> {
        throw new Error("Method not implemented.");
    }
    getSingleData?(id: string): Promise<PageView> {
        throw new Error("Method not implemented.");
    }
    id!: string;

}