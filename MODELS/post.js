const { Schema, model } = require('mongoose');
const commentSchema = require('./comment');
const postSchema = new Schema(
    {
        username: {
            type: String,
            required: 'leave a thought',
            minlength: 1,
            maxlength: 300,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        comments: [commentSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);
postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

const Post = model('Post', postSchema);

// const Post = model('Post', postSchema);

module.exports = Post;
