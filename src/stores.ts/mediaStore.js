import { defineStore } from 'pinia';
import axios from 'axios';
const apiUrl = 'https://your-api-endpoint/media';
export const useMediaStore = defineStore('media', {
    state: () => ({
        media: [],
        currentMedia: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchMedia() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(apiUrl);
                this.media = response.data;
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async fetchSingleMedia(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`${apiUrl}/${id}`);
                this.currentMedia = response.data;
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async uploadMedia(newMedia) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.post(apiUrl, newMedia);
                this.media.push(response.data);
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async updateMedia(id, updatedMedia) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.put(`${apiUrl}/${id}`, updatedMedia);
                const index = this.media.findIndex(media => media.id === id);
                if (index !== -1) {
                    this.media[index] = response.data;
                }
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async deleteMedia(id) {
            this.loading = true;
            this.error = null;
            try {
                await axios.delete(`${apiUrl}/${id}`);
                this.media = this.media.filter(media => media.id !== id);
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async processMedia(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.patch(`${apiUrl}/${id}`, { status: 'processing' });
                const index = this.media.findIndex(media => media.id === id);
                if (index !== -1) {
                    this.media[index].status = 'processing';
                }
                setTimeout(async () => {
                    const completeResponse = await axios.patch(`${apiUrl}/${id}`, { status: 'ready' });
                    if (index !== -1) {
                        this.media[index].status = 'ready';
                    }
                }, 5000);
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
