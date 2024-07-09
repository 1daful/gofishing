import { reactive } from "vue";
import { QuestionType } from "../utils/types";

const UseForm = (form: QuestionType)=> {
    
    const formValue = reactive(form)
    return formValue
}