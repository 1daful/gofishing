import { defineStore } from "pinia";
export const useData = defineStore({
    id: "useData",
    state: () => ({
        data: undefined
    }),
    actions: {
        async get(type, filters) {
            const data = await import(`/use${type}`);
            return data().get(filters);
        },
        async set(type, value) {
            const data = await import(`/use${type}`);
            data().set(value);
        }
    }
});
