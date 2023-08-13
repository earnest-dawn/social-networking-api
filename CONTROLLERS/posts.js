const Post = require('../MODELS/post');
// const { removeFriend } = require('../CONTROLLERS/pos');

const postController = {
    async getPosts(req, res) {
        try {
            const PostData = await Post.find().sort({ createdAt: -1 });
            res.json(PostData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createPost(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (error) {
            res.status(500).json(err);
        }
    },
    // async getOnePost(req, res) {
    //     try {
    //         const postData = await Post;
    //     } catch (error) {}
    // },
};

module.exports = postController;
