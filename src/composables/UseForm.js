import { reactive } from "vue";
const UseForm = (form) => {
    const formValue = reactive(form);
    return formValue;
};
