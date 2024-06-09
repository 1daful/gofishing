import { FormType, DataType, PageView } from "../src/utils/types";
import { IDataView } from "./IDataView";
export class VideoShare implements IDataView {
<<<<<<< HEAD
    getCreateData?(data?: any): Promise<PageView> {
=======
    create?(data?: any): Promise<PageView> {
>>>>>>> master
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