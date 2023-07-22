const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,
    editUser,
    deleteUser,
    getFriends,
    // getOneFriend,
    addFriend,
    removeFriend,
} = require('../../CONTROLLERS/user');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getOneUser).post(editUser).delete(deleteUser);

router.route('/:userid/friends/:friendID').post(addFriend).delete(removeFriend);

router.route('/:userId/friends').get(getFriends);

module.exports= router;