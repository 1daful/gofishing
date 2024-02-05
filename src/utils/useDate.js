import { defineStore } from "pinia";
export const useDate = defineStore({
    id: 'useUser',
    state: () => ({
        date: new Date()
    }),
    actions: {
        get() {
            return this.date;
        },
        set(date) {
            this.date = date;
        }
    }
});
