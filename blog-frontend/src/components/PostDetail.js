import React, { useEffect, useState } from 'react';
import { getPost, addComment, likePost } from '../api/api';
import { useParams } from 'react-router-dom';
import CommentThread from './CommentThread';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    getPost(id).then(res => setPost(res.data));
  }, [id]);

  const handleComment = async () => {
    await addComment(id, { text: comment }, token);
    setComment('');
    const updated = await getPost(id);
    setPost(updated.data);
  };

  const handleLike = async () => {
    await likePost(id, token);
    const updated = await getPost(id);
    setPost(updated.data);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>👍 {post.likes || 0} 👎 {post.dislikes || 0}</p>
      <button onClick={handleLike}>Like</button>

      <h4>Add Comment</h4>
      <textarea value={comment} onChange={e => setComment(e.target.value)} />
      <button onClick={handleComment}>Submit</button>

      <CommentThread comments={post.comments} />
    </div>
  );
}
