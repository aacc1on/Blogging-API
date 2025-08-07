import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);

export const getPosts = (params) => api.get('/posts', { params });
export const getPost = (id) => api.get(`/posts/${id}`);
export const createPost = (data, token) =>
  api.post('/posts', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addComment = (postId, data, token) =>
  api.post(`/posts/${postId}/comments`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const likePost = (postId, token) =>
  api.post(`/posts/${postId}/like`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;
