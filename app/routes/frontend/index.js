var express = require('express');
var router = express.Router();
const middleGetMenu  = require(__path_middleware + 'get-menu');
const middleHeader  = require(__path_middleware + 'header');
const middleFooter  = require(__path_middleware + 'footer');


router.use('/',middleGetMenu,middleHeader,middleFooter, require('./home'));

router.use('/articles', require('./articles'));
router.use('/category',require('./category'));
router.use('/contact', require('./contact'));
router.use('/post', require('./articles'));
router.use('/about', require('./about'));


module.exports = router;
