var express = require('express');
var router = express.Router();

const folderView	 = __path_views_blog + 'pages/post/';
const layoutBlog	 = __path_views_blog + 'frontend_post';
const CategoriesModel = require(__path_services + `backend/categories`);





/* GET home page. */
router.get('/', async function(req, res, next) {

  let itemsCategory=[];

  await CategoriesModel.listItemsFrontend(null, {task: 'items-in-menu'}).then((items)=>{
    itemsCategory=items;
    
  });
  res.render(`${folderView}index`, { 
    layout   : layoutBlog,
    top_post : false,
    top_weeklyNews: false,
    bottom_weeklyNews: false,
    youtubeArea: false,
    recentArticles: false,
    paginationArea: false,
    sildebar:false,
    sildebarFilter: true,
    itemsCategory
  });
});

module.exports = router;
