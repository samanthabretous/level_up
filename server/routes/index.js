const router = require('express').Router();

router.use('/application', require('./application-router'));
router.use('/company', require('./company-router'));
router.use('/demo', require('./demo-router'));
router.use('/position', require('./position-router'));
router.use('/user', require('./user-router'));

module.exports = router;
