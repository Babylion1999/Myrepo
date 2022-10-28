var express = require('express');
var router = express.Router();

const folderView	 = __path_views_blog + 'pages/post/';
const layoutBlog	 = __path_views_blog + 'frontend_post';
const ArticlesModel 	= require(__path_services + `backend/articles`);
const CategoriesModel = require(__path_services + `backend/categories`);
const ParamsHelpers = require(__path_helpers + 'params');




/* GET home page. */
router.get('(/:id)?', async function(req, res, next) {

  let itemsCategory=[];
  let idArticle 		= ParamsHelpers.getParam(req.params, 'id', '');
  let itemArticle		= {};
  console.log(idArticle);
  // Article Info
	await ArticlesModel.listItemsFrontend(null, {task: 'nomal'} ).then( (item) => { itemArticle = item; });
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
    idArticle
  });
});

module.exports = router;
