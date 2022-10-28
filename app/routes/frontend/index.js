var express = require('express');
var router = express.Router();

router.use('/', require('./home'));

router.use('/articles', require('./articles'));
router.use('/category', require('./category'));
router.use('/post', require('./articles'));
router.use('/about', require('./about'));


module.exports = router;
