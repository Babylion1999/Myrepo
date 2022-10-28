var express = require('express');
var router = express.Router();
const changeName = "articles";
const CategoriesModel = require(__path_services + `backend/categories`);

const MainModel 	= require(__path_services + `backend/${changeName}`);
const SettingsModel = require(__path_services + `backend/settings`);

const folderView	 = __path_views_blog + 'pages/home/';
const layoutBlog	 = __path_views_blog + 'frontend';

/* GET home page. */
router.get('/', async function(req, res, next) {
  let itemsTopPost =[];
  let itemsCategory=[];
  let itemsLogo=[];
  
  await MainModel.listItemsFrontend(null, {task: 'list-artical'}).then((items)=>{
    itemsTopPost=items;
    
  });
  await CategoriesModel.listItemsFrontend(null, {task: 'items-in-menu'}).then((items)=>{
    itemsCategory=items;
  });
  await SettingsModel.getLogo(null,{task:'get-logo-header'}).then((logos)=>{
    itemsLogo = logos;
  })
  res.render(`${folderView}index`, { 
    layout   : layoutBlog,
    top_post : true,
    top_weeklyNews: true,
    bottom_weeklyNews: true,
    youtubeArea: true,
    recentArticles: true,
    paginationArea: true,
    sildebar:true,
    itemsTopPost,
    itemsCategory,
    itemsLogo
   });


  
});

module.exports = router;
