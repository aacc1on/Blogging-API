// routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const post = new Post({ ...req.body, author: req.user.id });
  await post.save();
  res.status(201).json(post);
});

router.get('/', async (req, res) => {
  const { category, tag } = req.query;
  const filter = {};
  if (category) filter.categories = category;
  if (tag) filter.tags = tag;
  const posts = await Post.find(filter).populate('author', 'username');
  res.json(posts);
});

router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('author', 'username')
    .lean();
  const likeCount = post.likes?.length || 0;
  const dislikeCount = post.dislikes?.length || 0;
  res.json({ ...post, likeCount, dislikeCount });
});

router.post('/:id/like', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.user.id)) {
    post.likes.push(req.user.id);
    post.dislikes = post.dislikes.filter(id => id.toString() !== req.user.id);
  }
  await post.save();
  res.json({ message: 'Liked' });
});

router.post('/:id/dislike', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.dislikes.includes(req.user.id)) {
    post.dislikes.push(req.user.id);
    post.likes = post.likes.filter(id => id.toString() !== req.user.id);
  }
  await post.save();
  res.json({ message: 'Disliked' });
});

router.post('/:id/comments', auth, async (req, res) => {
  const { content, parent } = req.body;
  const comment = new Comment({
    content,
    author: req.user.id,
    post: req.params.id,
    parent: parent || null,
  });
  await comment.save();
  res.status(201).json(comment);
});

router.get('/:id/comments', async (req, res) => {
  const comments = await Comment.find({ post: req.params.id })
    .populate('author', 'username')
    .lean();

  const nested = (parent = null) =>
    comments.filter(c => String(c.parent) === String(parent)).map(c => ({
      ...c,
      replies: nested(c._id)
    }));

  res.json(nested());
});

module.exports = router;