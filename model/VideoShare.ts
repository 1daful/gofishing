import { FormType, DataType } from "../src/utils/types";
import { IDataView } from "./IDataView";
export class VideoShare implements IDataView {
    id: string;
    getCreateData(data?: any): Promise<FormType> {
        throw new Error("Method not implemented.");
    }
    getListData(query?: any): Promise<DataType> {
        throw new Error("Method not implemented.");
    }
    getSingleData(id: string): Promise<DataType> {
        
    }

}