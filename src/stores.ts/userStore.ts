interface User {
    id: string;
    email: string;
    phone?: string;
    user_metadata?: Record<string, any>;
    app_metadata?: Record<string, any>;
    created_at: string;
    updated_at: string;
    last_sign_in_at: string;
    role: string;
    // Add other relevant fields from the Supabase user object
  }

  // store/userStore.ts
import { defineStore } from 'pinia'
import { auth } from '../../config/model';
//import { SupabaseClient } from '@supabase/supabase-js'

// Assuming you have initialized Supabase client somewhere
//const supabase = new SupabaseClient('your-supabase-url', 'your-anon-key');

interface State {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    user: null,
    loading: false,
    error: null,
  }),

  actions: {
    async signUp(user: User, password: string) {
      this.loading = true;
      this.error = null;
      const { data, error } = await auth.signUp({email: user.email,  password: password}, user.user_metadata);
      if (error) {
        this.error = error.message;
      } else {
        this.user = data;
       // this.$emit('userSignedUp', user);
      }
      this.loading = false;
    },

    async signIn(id: string, user: User) {
      this.loading = true;
      this.error = null;
      const { data, error } = await auth.login(id, user);
      if (error) {
        this.error = error.message;
      } else {
        this.user = data;
       // this.$emit('userLoggedIn', user);
      }
      this.loading = false;
    },

    async signOut() {
      this.loading = true;
      const { error } = await auth.logout();
      if (error) {
        this.error = error.message;
      } else {
        this.user = null;
        //this.$emit('userLoggedOut');
      }
      this.loading = false;
    },

    async updateUser(userData: Partial<User>) {
      this.loading = true;
      this.error = null;
      // Assuming user metadata update
      const { user, error } = await auth.updateUser(userData);
      if (error) {
        this.error = error.message;
      } else {
        this.user = { ...this.user, ...user };
        //this.$emit('userUpdated', user);
      }
      this.loading = false;
    },

    /*async deleteUser() {
      this.loading = true;
      this.error = null;
      const { error } = await auth.api.deleteUser(this.user.id);
      if (error) {
        this.error = error.message;
      } else {
        this.user = null;
       // this.$emit('userDeleted');
      }
      this.loading = false;
    },*/

    async recoverPassword(email: string) {
      this.loading = true;
      this.error = null;
      const { error } = await auth.resetPassword(email);
      if (error) {
        this.error = error.message;
      } else {
        //this.$emit('passwordRecoveryRequested', email);
      }
      this.loading = false;
    },

    async updatePassword(key: string, value: string) {
      this.loading = true;
      this.error = null;
      const { error } = await auth.updateCred(key, value);
      if (error) {
        this.error = error.message;
      } else {
       // this.$emit('passwordUpdated');
      }
      this.loading = false;
    },
  },
})