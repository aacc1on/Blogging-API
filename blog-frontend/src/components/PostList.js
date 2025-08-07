import React, { useEffect, useState } from 'react';
import { getPosts } from '../api/api';
import { Link } from 'react-router-dom';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(res => setPosts(res.data));
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      {posts.map(post => (
        <div key={post._id}>
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  );
}
