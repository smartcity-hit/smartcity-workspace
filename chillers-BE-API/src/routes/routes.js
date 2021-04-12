const Router = require('express').Router;
const router = new Router();

router.use('/users', require('./api/users'));
router.use('/chillers', require('./api/chillers-temp'));
router.use('/counters', require('./api/counters'));
router.use('/counter', require('./api/counters'));
module.exports = router;
