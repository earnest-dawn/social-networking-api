const router = require('express').Router();
const {
    getPosts,
    getOnePost,
    createThought,
    deletePost,
    editPost,
    addComment,
    deleteComment,
    editComment,
} = require('../MODELS/post');
