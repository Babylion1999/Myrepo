var express = require('express');
var router = express.Router();
const articlesModel 		= require(__path_schemas + 'articles');
const folderView	 = __path_views_blog + 'pages/post/';
const layoutBlog	 = __path_views_blog + 'frontend_post';
const ArticlesModel 	= require(__path_services + `backend/articles`);
const CategoriesModel = require(__path_services + `backend/categories`);
const ParamsHelpers = require(__path_helpers + 'params');




/* GET home page. */
router.get('/:id', async function(req, res, next) {

  let itemsCategory=[];
 let idArticle 		= ParamsHelpers.getParam(req.params, 'id', null);
 
  let itemArticle = await articlesModel.findById(idArticle).then((result)=>{
    return result
  }).catch((errors)=>{
    return;
  });
  if(!itemArticle) {
    res.send('page not fount');
    return;
  }
  
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
    itemsCategory,
    itemArticle
  });
});

module.exports = router;
