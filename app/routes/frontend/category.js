var express = require('express');
var router = express.Router();
const ArticlesModel 	= require(__path_services + `backend/articles`);
const CategoriesModel = require(__path_services + `backend/categories`);
const categoriesModel 	= require(__path_schemas + 'categories');
const SocialsModel 	= require(__path_services + `backend/socials`);
const ParamsHelpers = require(__path_helpers + 'params');
const folderView	 = __path_views_blog + 'pages/category/';
const layoutBlog	 = __path_views_blog + 'frontend';

/* GET home page. */
router.get('(/:id)?', async function(req, res, next) {
  let objWhere	 = {};
  let idCategory 		= ParamsHelpers.getParam(req.params, 'id', '');
 
  let keyword		 = ParamsHelpers.getParam(req.query, 'keyword', '');
  let itemsCategory=[];
  let itemsAll=[];
  let itemsNews=[];

	let itemsInCategory	= [];

  let pagination 	 = {
		totalItems		 : 1,
		totalItemsPerPage: 3,
		currentPage		 : parseInt(ParamsHelpers.getParam(req.query, 'page', 1)),
		pageRanges		 : 3
	};
  
  if(keyword !== '') keySearch = new RegExp(keyword, 'i');
  itemsInCategory = await categoriesModel.findById(idCategory).then((result)=>{
    return result
  }).catch((errors)=>{
    return;
  });
  if(!itemsInCategory) {
    res.send('page not fount');
    return;
  }
  await ArticlesModel.listItemsFrontend(null, {task: 'items-news'}).then((items)=>{
    itemsNews=items;
  });
  await CategoriesModel.listItemsFrontend(null, {task: 'items-in-menu'}).then((items)=>{
    itemsCategory=items;
    
  });
  await SocialsModel.listItems({}).then((items)=>{
    itemsSocials= items;
  });
  await ArticlesModel.listItemsFrontend(null, {task: 'items-all-articles'}).then((items)=>{
    itemsAll=items;
    
  });
  // Article In Category
	await ArticlesModel.listItemsFrontend({id: idCategory}, {task: 'items-in-category'},'',pagination ).then( (items) => { itemsInCategory = items; });

  res.render(`${folderView}index`, { 
    layout   : layoutBlog,
    top_post : false,
    top_weeklyNews: false,
    bottom_weeklyNews: false,
    youtubeArea: false,
    recentArticles: false,
    paginationArea: false,
    
    sildebarFilter: true,
    sildebar:false,
    itemsNews,
    itemsCategory,
    itemsSocials,
    itemsAll,
    itemsInCategory,
    keyword,
    pagination,
    idCategory
  });
});



module.exports = router;
