import { defineStore } from 'pinia';
import axios from 'axios';
import { dbClient } from '../../config/model';
export const usePostStore = defineStore('post', {
    state: () => ({
        posts: [],
        post: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchPosts() {
            this.loading = true;
            this.error = null;
            try {
                const response = await dbClient.get('post');
                this.posts = response.data;
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async fetchPost(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`${apiUrl}/${id}`);
                this.post = response.data;
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async createPost(newPost) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.post(apiUrl, newPost);
                this.posts.push(response.data);
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async updatePost(id, updatedPost) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.put(`${apiUrl}/${id}`, updatedPost);
                const index = this.posts.findIndex(post => post.id === id);
                if (index !== -1) {
                    this.posts[index] = response.data;
                }
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async deletePost(id) {
            this.loading = true;
            this.error = null;
            try {
                await axios.delete(`${apiUrl}/${id}`);
                this.posts = this.posts.filter(post => post.id !== id);
            }
            catch (error) {
                this.error = error.message;
            }
            finally {
                this.loading = false;
            }
        },
        async likePost(id) {
        },
        async unlikePost(id) {
        },
        async commentPost(id, comment) {
        },
        async deleteComment(id, commentId) {
        }
    }
});
