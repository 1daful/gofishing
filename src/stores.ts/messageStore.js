import { defineStore } from 'pinia';
import axios from 'axios';
const apiUrl = 'https://your-api-endpoint/messages';
export const useMessageStore = defineStore('message', {
    state: () => ({
        messages: [],
        message: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchMessages() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(apiUrl);
                this.messages = response.data;
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async fetchMessage(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`${apiUrl}/${id}`);
                this.message = response.data;
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async createMessage(newMessage) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.post(apiUrl, newMessage);
                this.messages.push(response.data);
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async updateMessage(id, updatedMessage) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.put(`${apiUrl}/${id}`, updatedMessage);
                const index = this.messages.findIndex(message => message.id === id);
                if (index !== -1) {
                    this.messages[index] = response.data;
                }
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async deleteMessage(id) {
            this.loading = true;
            this.error = null;
            try {
                await axios.delete(`${apiUrl}/${id}`);
                this.messages = this.messages.filter(message => message.id !== id);
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async markMessageAsDelivered(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.patch(`${apiUrl}/${id}`, { status: 'delivered' });
                const index = this.messages.findIndex(message => message.id === id);
                if (index !== -1) {
                    this.messages[index].status = 'delivered';
                }
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async markMessageAsRead(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.patch(`${apiUrl}/${id}`, { status: 'read' });
                const index = this.messages.findIndex(message => message.id === id);
                if (index !== -1) {
                    this.messages[index].status = 'read';
                }
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        }
    }
});
