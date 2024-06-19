interface Post {
    id: number;
    date: string;
    date_gmt: string;
    guid: { rendered: string };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: Record<string, any>;
    categories: number[];
    tags: number[];
    _links: Record<string, any>;
    // Add other relevant fields from the WordPress post object
  }
  // store/postStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

// Replace with your actual API endpoint
const apiUrl = 'https://your-wordpress-api-endpoint/wp-json/wp/v2/posts';

interface State {
  posts: Post[];
  post: Post | null;
  loading: boolean;
  error: string | null;
}

export const usePostStore = defineStore('post', {
  state: (): State => ({
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
        const response = await axios.get(apiUrl);
        this.posts = response.data;
        //this.$emit('postsFetched', this.posts);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchPost(id: number) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${apiUrl}/${id}`);
        this.post = response.data;
        //this.$emit('postFetched', this.post);
      } catch (error) {
        this.error = error.message;
    } finally {
        this.loading = false;
      }
    },

    async createPost(newPost: Partial<WordPressPost>) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(apiUrl, newPost);
        this.posts.push(response.data);
        //this.$emit('postCreated', response.data);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async updatePost(id: number, updatedPost: Partial<WordPressPost>) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.put(`${apiUrl}/${id}`, updatedPost);
        const index = this.posts.findIndex(post => post.id === id);
        if (index !== -1) {
          this.posts[index] = response.data;
        }
       // this.$emit('postUpdated', response.data);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async deletePost(id: number) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`${apiUrl}/${id}`);
        this.posts = this.posts.filter(post => post.id !== id);
       // this.$emit('postDeleted', id);
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async likePost(id: number) {
      // Implement liking functionality
     // this.$emit('postLiked', id);
    },

    async unlikePost(id: number) {
      // Implement unliking functionality
      //this.$emit('postUnliked', id);
    },

    async commentPost(id: number, comment: string) {
      // Implement commenting functionality
     // this.$emit('postCommented', { id, comment });
    },

    async deleteComment(id: number, commentId: number) {
      // Implement comment deletion functionality
      //this.$emit('postCommentDeleted', { id, commentId });
    }
  }
})