import { defineStore } from 'pinia';
import { auth } from '../../config/model';
export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        loading: false,
        error: null,
    }),
    actions: {
        async signUp(user, password) {
            this.loading = true;
            this.error = null;
            const { data, error } = await auth.signUp({ email: user.email, password: password }, user.user_metadata);
            if (error) {
                this.error = error.message;
            }
            else {
                this.user = data;
            }
            this.loading = false;
        },
        async signIn(id, user) {
            this.loading = true;
            this.error = null;
            const { data, error } = await auth.login(id, user);
            if (error) {
                this.error = error.message;
            }
            else {
                this.user = data;
            }
            this.loading = false;
        },
        async signOut() {
            this.loading = true;
            const { error } = await auth.logout();
            if (error) {
                this.error = error.message;
            }
            else {
                this.user = null;
            }
            this.loading = false;
        },
        async updateUser(userData) {
            this.loading = true;
            this.error = null;
            const { user, error } = await auth.updateUser(userData);
            if (error) {
                this.error = error.message;
            }
            else {
                this.user = { ...this.user, ...user };
            }
            this.loading = false;
        },
        async recoverPassword(email) {
            this.loading = true;
            this.error = null;
            const { error } = await auth.resetPassword(email);
            if (error) {
                this.error = error.message;
            }
            else {
            }
            this.loading = false;
        },
        async updatePassword(key, value) {
            this.loading = true;
            this.error = null;
            const { error } = await auth.updateCred(key, value);
            if (error) {
                this.error = error.message;
            }
            else {
            }
            this.loading = false;
        },
    },
});
