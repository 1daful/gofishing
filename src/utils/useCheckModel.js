import { defineStore } from "pinia";
export const useUser = defineStore({
    id: 'useUser',
    state: () => ({
        check: [],
        checks: {}
    }),
    actions: {
        get(id) {
            return this.users.filter(user => user.id === id);
        },
        insert(...user) {
            this.users.push(...user);
        }
    }
});
