import { defineStore } from "pinia";
export const useUser = defineStore({
    id: 'useUser',
    state: () => ({
        user: {
            id: '',
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            phone: 0,
            address: '',
            pasword: ''
        },
        users: [{
                id: '',
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                phone: 0,
                address: '',
                pasword: ''
            }]
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
