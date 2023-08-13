const router = require('express').Router();
const routes = require('./api');
router.use('api', routes);

router.use((req, res) => {
    return res.send('Wrong route!');
});

module.exports = router;
