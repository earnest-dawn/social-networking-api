const router = require('express').Router();
const {
    getPosts,
    // getOnePost,
    createPost,
    // deletePost,
    // editPost,
    // addComment,
    // deleteComment,
    // editComment,
} = require('../../CONTROLLERS/posts');

router.route('/posts').get(getPosts).post(createPost);

module.exports = router;
