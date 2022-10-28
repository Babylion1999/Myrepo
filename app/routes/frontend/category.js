var express = require('express');
var router = express.Router();
const ArticlesModel 	= require(__path_services + `backend/articles`);
const CategoriesModel = require(__path_services + `backend/categories`);
const ParamsHelpers = require(__path_helpers + 'params');
const folderView	 = __path_views_blog + 'pages/category/';
const layoutBlog	 = __path_views_blog + 'frontend';

/* GET home page. */
router.get('(/:id)?', async function(req, res, next) {
 
  let idCategory 		= ParamsHelpers.getParam(req.params, 'id', '');
 
  console.log(idCategory);
  let itemsCategory=[];
  let itemsAll=[];
 

	let itemsInCategory	= [];
  await CategoriesModel.listItemsFrontend(null, {task: 'items-in-menu'}).then((items)=>{
    itemsCategory=items;
    
  });
  await ArticlesModel.listItemsFrontend(null, {task: 'items-all-articles'}).then((items)=>{
    itemsAll=items;
    
  });
  // Article In Category
	await ArticlesModel.listItemsFrontend({id: idCategory}, {task: 'items-in-category'} ).then( (items) => { itemsInCategory = items; });

  res.render(`${folderView}index`, { 
    layout   : layoutBlog,
    top_post : false,
    top_weeklyNews: false,
    bottom_weeklyNews: false,
    youtubeArea: false,
    recentArticles: false,
    paginationArea: false,
    sildebar:true,
    itemsCategory,
    itemsAll,
    itemsInCategory
  });
});



module.exports = router;
