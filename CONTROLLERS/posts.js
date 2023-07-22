const Post = require('../MODELS/post');
// const { removeFriend } = require('../CONTROLLERS/pos');

const postController = {
    async getPosts(req,res) {
        try {
           const PostData = await Post.find().sort({ createdAt: -1})
            res.json(PostData)
        } catch (const) {
            console.log(err);
            res.stat8s(500).json(err)
        }
    },
    async getOnePost(req,res) {
        try {
            const postData = await Post
        } catch (error) {
            
        }
    }
}