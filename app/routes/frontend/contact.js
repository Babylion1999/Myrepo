var express = require('express');
var router = express.Router();
const changeName = "contact";
const notify  		= require(__path_configs + 'notify');
const MainModel 	= require(__path_services + `backend/${changeName}`);
const CategoriesModel = require(__path_services + `backend/categories`);
const ValidateContact	= require(__path_validates + `${changeName}`);
const folderView	 = __path_views_blog + 'pages/contact/';
const layoutBlog	 = __path_views_blog + 'frontend';
const linkIndex		 = `/${changeName}/`;
const notifier = require('node-notifier');
const path = require('path');


/* GET home page. */
router.get('/', async function(req, res, next) {


  let itemsCategory=[];
  await CategoriesModel.listItemsFrontend(null, {task: 'items-in-menu'}).then((items)=>{
    itemsCategory=items;
    
  });
  res.render(`${folderView}index`, { 
    layout   : layoutBlog,
    top_post : false,
    sildebarFilter: false,
    top_weeklyNews: false,
    bottom_weeklyNews: false,
    youtubeArea: false,
    recentArticles: false,
    paginationArea: false,
    sildebar:false,
    itemsCategory,
    
  });
});
// SAVE = ADD EDIT
router.post('/save', async(req, res, next) => {
	req.body = JSON.parse(JSON.stringify(req.body));
    console.log('123');
	ValidateContact.validator(req);
	let item = Object.assign(req.body);
	let errors = req.validationErrors();
	let taskCurrent = (typeof item !== "undefined" && item.id !== "") ? "add" : "add";
		if(errors) { 
			res.render(`${folderView}index`, { item, errors});
		}else{
			let massage= (taskCurrent=="edit") ? notify.EDIT_SUCCESS : notify.ADD_SUCCESS;
                
				MainModel.saveItems(item,{task:taskCurrent}).then((result)=>{
          notifier.notify(
            {
              title: 'My awesome title',
              message: 'Hello from node, Mr. User!',
              icon: path.join(__dirname, 'coulson.jpg'),
            },)
            MainModel.sendEmail(item.email);  
				req.flash('success', massage, false);
				res.redirect(linkIndex);
			});
      
			
			
		}		
});

module.exports = router;
