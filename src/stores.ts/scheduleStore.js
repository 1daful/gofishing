import { defineStore } from 'pinia';
import axios from 'axios';
const apiUrl = 'https://your-api-endpoint/schedules';
export const useScheduleStore = defineStore('schedule', {
    state: () => ({
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
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async fetchSingleSchedule(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`${apiUrl}/${id}`);
                this.currentSchedule = response.data;
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async createSchedule(newSchedule) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.post(apiUrl, newSchedule);
                this.schedules.push(response.data);
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async updateSchedule(id, updatedSchedule) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.put(`${apiUrl}/${id}`, updatedSchedule);
                const index = this.schedules.findIndex(schedule => schedule.id === id);
                if (index !== -1) {
                    this.schedules[index] = response.data;
                }
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async deleteSchedule(id) {
            this.loading = true;
            this.error = null;
            try {
                await axios.delete(`${apiUrl}/${id}`);
                this.schedules = this.schedules.filter(schedule => schedule.id !== id);
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async startSchedule(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.patch(`${apiUrl}/${id}`, { status: 'in-progress' });
                const index = this.schedules.findIndex(schedule => schedule.id === id);
                if (index !== -1) {
                    this.schedules[index].status = 'in-progress';
                }
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async completeSchedule(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.patch(`${apiUrl}/${id}`, { status: 'completed' });
                const index = this.schedules.findIndex(schedule => schedule.id === id);
                if (index !== -1) {
                    this.schedules[index].status = 'completed';
                }
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async cancelSchedule(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.patch(`${apiUrl}/${id}`, { status: 'canceled' });
                const index = this.schedules.findIndex(schedule => schedule.id === id);
                if (index !== -1) {
                    this.schedules[index].status = 'canceled';
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
