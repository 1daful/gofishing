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
        get(id: string) {
            return this.users.filter(user => user.id === id) 
        },
        insert(...user: { id: string; firstName: string; lastName: string; username: string; email: string; phone: number; address: string; pasword: string; }[]) {
            this.users.push(...user)
        }
    }


})