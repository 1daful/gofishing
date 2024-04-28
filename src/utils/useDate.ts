import { defineStore } from "pinia";

export const useDate = defineStore({
    id: 'useUser',
    state: () => ({
        date: new Date()
    }),
    actions: {
        get() {
            return this.date
        },
        set(date: Date) {
            this.date = date
        }
    }

})