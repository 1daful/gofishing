interface Schedule {
    id: number;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    status: 'scheduled' | 'in-progress' | 'completed' | 'canceled';
  }
  // store/scheduleStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

// Replace with your actual API endpoint
const apiUrl = 'https://your-api-endpoint/schedules';

interface State {
  schedules: Schedule[];
  currentSchedule: Schedule | null;
  loading: boolean;
  error: string | null;
}

export const useScheduleStore = defineStore('schedule', {
  state: (): State => ({
    schedules: [],
    currentSchedule: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchSchedules() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(apiUrl);
        this.schedules = response.data;
        //this.$emit('schedulesFetched', this.schedules);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchSingleSchedule(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${apiUrl}/${id}`);
        this.currentSchedule = response.data;
        //this.$emit('scheduleFetched', this.currentSchedule);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async createSchedule(newSchedule: Partial<Schedule>) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(apiUrl, newSchedule);
        this.schedules.push(response.data);
        //this.$emit('scheduleCreated', response.data);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async updateSchedule(id: number, updatedSchedule: Partial<Schedule>) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.put(`${apiUrl}/${id}`, updatedSchedule);
        const index = this.schedules.findIndex(schedule => schedule.id === id);
        if (index !== -1) {
          this.schedules[index] = response.data;
        }
        //this.$emit('scheduleUpdated', response.data);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async deleteSchedule(id: number) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`${apiUrl}/${id}`);
        this.schedules = this.schedules.filter(schedule => schedule.id !== id);
        //this.$emit('scheduleDeleted', id);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async startSchedule(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.patch(`${apiUrl}/${id}`, { status: 'in-progress' });
        const index = this.schedules.findIndex(schedule => schedule.id === id);
        if (index !== -1) {
          this.schedules[index].status = 'in-progress';
        }
        //this.$emit('scheduleStarted', response.data);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async completeSchedule(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.patch(`${apiUrl}/${id}`, { status: 'completed' });
        const index = this.schedules.findIndex(schedule => schedule.id === id);
        if (index !== -1) {
          this.schedules[index].status = 'completed';
        }
        //this.$emit('scheduleCompleted', response.data);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async cancelSchedule(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.patch(`${apiUrl}/${id}`, { status: 'canceled' });
        const index = this.schedules.findIndex(schedule => schedule.id === id);
        if (index !== -1) {
          this.schedules[index].status = 'canceled';
        }
        //this.$emit('scheduleCanceled', response.data);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
})