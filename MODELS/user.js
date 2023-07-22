const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'post',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'friends',
        },
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comments',
        },
    ],
    toJson: {
        virtuals: true,
    },
    id: false,
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
    console.log(friendCount);
});

userSchema.virtual('postCount').get(function () {
    return this.posts.length;
    console.log(postCount);
});

userSchema.virtual('commentCount').get(function () {
    return this.comments.length;
    console.log(commentCount);
});

const User = model('Profile', userSchema);

module.exports = User;
