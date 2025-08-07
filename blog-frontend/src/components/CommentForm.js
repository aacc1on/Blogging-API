import React, { useState } from 'react';
import { addComment, getPost } from '../api/api';

export default function CommentForm({ postId, parentId, onCommented }) {
  const [text, setText] = useState('');
  const token = localStorage.getItem('token');

  const submit = async () => {
    await addComment(postId, { text, parentId }, token);
    setText('');
    onCommented(); // refresh post
  };

  return (
    <div style={{ marginTop: 10 }}>
      <textarea placeholder="Reply..." value={text} onChange={e => setText(e.target.value)} />
      <button onClick={submit}>Reply</button>
    </div>
  );
}
