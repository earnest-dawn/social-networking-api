const router = require('express').Router();
const userRoutes = require('./user');
const postRoutes = require('./post');

router.use('profiles', userRoutes);
module.exports = router;
