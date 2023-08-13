const User = require('../MODELS/user');
// const { removeFriend } = require('../Main/controllers/user-controller');

const userController = {
    // all users
    async getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({ path: 'thoughts', select: 'v' })
            .select('v')
            .then((dbUserData) => {
                return res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    async getUsers(req, res) {
        try {
            const userData = await User.find().select('-__v');
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getAllUsers(req, res) {
        try {
            const userData = await User.find()
                .populate({ path: 'thoughts', select: 'v' })
                .populate({ path: 'friends', select: 'v' })
                .select('__v')
                .then((userData) => res.json(userData));
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // get one user
    async getOneUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.id })
                .select('-__v')
                .populate('friends')
                .populate('thoughts');
            if (!userData) {
                return res
                    .status(404)
                    .json({ message: 'No user with this Id' });
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (error) {
            res.status(500).json(err);
        }
    },

    // delete user and related thoughts/comments

    async editUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                {
                    runValidators: true,
                    new: true,
                }
            );

            if (!userData) {
                return res.status(404).json({ message: 'Invaid User' });
            }
            res.json(userData);
        } catch (error) {
            console.log(error);
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete({
                _id: req.params.userId,
            });

            if (!userData) {
                return res
                    .status(404)
                    .json({ message: 'No user with this id!' });
            }

            await Post.deleteMany({ _id: { $in: userData.Posts } });
            res.json({ message: 'user and posts deleted' });
        } catch (err) {
            console.log(err);
            res.jsonn(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const userData = await User.findByIdAndUpdate(
                { _id: req.params.UserId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!userData) {
                return res
                    .status(404)
                    .json({ message: 'No user with this Id' });
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const userData = await User.findOneAndDelete(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!userData) {
                return res
                    .status(404)
                    .json({ message: 'No user with this id!' });
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            res(500).json(err);
        }
    },
};

module.exports = userController;
