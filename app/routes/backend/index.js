var express = require('express');
var router = express.Router();

router.use('/', require('./home'));
router.use('/dashboard', require('./dashboard'));
router.use('/items', require('./items'));
router.use('/header', require('./header'));
router.use('/footer', require('./footer'));
router.use('/socials', require('./socials'));
router.use('/slider', require('./slider'));
router.use('/groups', require('./groups'));
router.use('/users', require('./users'));
router.use('/articles', require('./articles'));
router.use('/navbar', require('./navbar'));
router.use('/categories', require('./categories'));
router.use('/settings', require('./settings'));


module.exports = router;
