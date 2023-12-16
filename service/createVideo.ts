import { IDataView } from "../model/IDataView";
import { FormType, DataType, Action } from "../src/utils/types";
import { EdiStorage } from "@edifiles/services";

export class Video implements IDataView {
    id: string;
    getCreateData(data?: any): Promise<FormType> {
        const form: FormType = {
            name: "",
            actions: {},
            content: [
                {
                    title: '',
                    index: 0,
                    actions: {},
                    content: [{
                        question: "Upload a video",
                        answer: '',
                        inputType: "file",
                        name: "video",
                        action: new Action({
                            event: 'Upload',
                            args: [form.content[0].content[0].answer],
                            onError: [],
                            onResult: []
                        })
                    }]
                }
            ]
        }
    }

    getListData(query?: any): Promise<DataType> {
        throw new Error("Method not implemented.");
    }
    getSingleData(id: string): Promise<DataType> {
        throw new Error("Method not implemented.");
    }
    
}