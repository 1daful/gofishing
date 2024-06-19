interface Media {
    id: number;
    title: string;
    url: string;
    type: 'image' | 'video' | 'audio' | 'document';
    description: string;
    uploaded_at: string;
    status: 'uploaded' | 'processing' | 'ready' | 'failed';
  }
  // store/mediaStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

// Replace with your actual API endpoint
const apiUrl = 'https://your-api-endpoint/media';

interface State {
  media: Media[];
  currentMedia: Media | null;
  loading: boolean;
  error: string | null;
}

export const useMediaStore = defineStore('media', {
  state: (): State => ({
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
        //this.$emit('mediaFetched', this.media);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchSingleMedia(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${apiUrl}/${id}`);
        this.currentMedia = response.data;
       // this.$emit('mediaFetched', this.currentMedia);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async uploadMedia(newMedia: Partial<Media>) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(apiUrl, newMedia);
        this.media.push(response.data);
        //this.$emit('mediaUploaded', response.data);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async updateMedia(id: number, updatedMedia: Partial<Media>) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.put(`${apiUrl}/${id}`, updatedMedia);
        const index = this.media.findIndex(media => media.id === id);
        if (index !== -1) {
          this.media[index] = response.data;
        }
       //this.$emit('mediaUpdated', response.data);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async deleteMedia(id: number) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`${apiUrl}/${id}`);
        this.media = this.media.filter(media => media.id !== id);
        //this.$emit('mediaDeleted', id);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async processMedia(id: number) {
      this.loading = true;
      this.error = null;
      try {
        // Simulate media processing logic
        const response = await axios.patch(`${apiUrl}/${id}`, { status: 'processing' });
        const index = this.media.findIndex(media => media.id === id);
        if (index !== -1) {
          this.media[index].status = 'processing';
        }
       // this.$emit('mediaProcessing', response.data);

        // Simulate processing completion
        setTimeout(async () => {
          const completeResponse = await axios.patch(`${apiUrl}/${id}`, { status: 'ready' });
          if (index !== -1) {
            this.media[index].status = 'ready';
          }
         // this.$emit('mediaReady', completeResponse.data);
        }, 5000); // Simulate 5 seconds processing time
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
})