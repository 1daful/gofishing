interface Message {
    id: number;
    sender: string;
    recipient: string;
    content: string;
    timestamp: string;
    status: 'sent' | 'delivered' | 'read';
  }
  // store/messageStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

// Replace with your actual API endpoint
const apiUrl = 'https://your-api-endpoint/messages';

interface State {
  messages: Message[];
  message: Message | null;
  loading: boolean;
  error: string | null;
}

export const useMessageStore = defineStore('message', {
  state: (): State => ({
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
        //this.$emit('messagesFetched', this.messages);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchMessage(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${apiUrl}/${id}`);
        this.message = response.data;
        //this.$emit('messageFetched', this.message);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async createMessage(newMessage: Partial<Message>) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(apiUrl, newMessage);
        this.messages.push(response.data);
       // this.$emit('messageCreated', response.data);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async updateMessage(id: number, updatedMessage: Partial<Message>) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.put(`${apiUrl}/${id}`, updatedMessage);
        const index = this.messages.findIndex(message => message.id === id);
        if (index !== -1) {
          this.messages[index] = response.data;
        }
        //this.$emit('messageUpdated', response.data);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async deleteMessage(id: number) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`${apiUrl}/${id}`);
        this.messages = this.messages.filter(message => message.id !== id);
        //this.$emit('messageDeleted', id);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async markMessageAsDelivered(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.patch(`${apiUrl}/${id}`, { status: 'delivered' });
        const index = this.messages.findIndex(message => message.id === id);
        if (index !== -1) {
          this.messages[index].status = 'delivered';
        }
        //this.$emit('messageDelivered', response.data);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async markMessageAsRead(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.patch(`${apiUrl}/${id}`, { status: 'read' });
        const index = this.messages.findIndex(message => message.id === id);
        if (index !== -1) {
          this.messages[index].status = 'read';
        }
        //this.$emit('messageRead', response.data);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
})