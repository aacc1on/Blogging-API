import React, { useState } from 'react';
import { createPost } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [form, setForm] = useState({ title: '', content: '', category: '', tags: '' });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()),
      };
      await createPost(payload, token);
      navigate('/');
    } catch (err) {
      alert('Error creating post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Post</h2>
      <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="Content" onChange={e => setForm({ ...form, content: e.target.value })} />
      <input placeholder="Category" onChange={e => setForm({ ...form, category: e.target.value })} />
      <input placeholder="Tags (comma-separated)" onChange={e => setForm({ ...form, tags: e.target.value })} />
      <button type="submit">Create</button>
    </form>
  );
}
