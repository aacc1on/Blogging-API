import React, { useState } from 'react';
import CommentForm from './CommentForm';

export default function CommentThread({ comments, postId, level = 0, refresh }) {
  if (!comments) return null;

  return (
    <ul style={{ marginLeft: level * 20 }}>
      {comments.map(c => (
        <li key={c._id}>
          {c.text}
          <CommentForm postId={postId} parentId={c._id} onCommented={refresh} />
          {c.replies && <CommentThread comments={c.replies} postId={postId} level={level + 1} refresh={refresh} />}
        </li>
      ))}
    </ul>
  );
}
