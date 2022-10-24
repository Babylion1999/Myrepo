var express = require('express');
var router = express.Router();
const changeName ="settings"

const MainModel 	= require(__path_services + `backend/${changeName}`);
const folderView	 = __path_views_admin + 'pages/settings/';
const notify  		= require(__path_configs + 'notify');
const systemConfig  = require(__path_configs + 'system');
const fileHelpers = require(__path_helpers + 'upload');
const uploadThumb = fileHelpers.uploadImg('logoHeader','backend/adminlte/images/settings');
const linkIndex		 = '/' + systemConfig.prefixAdmin + `/${changeName}/`;
const ValidateArticles	= require(__path_validates + `${changeName}`);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(`${folderView}form`, { pageTitle   : 'SettingPage ' });
});
router.post('/save', async(req, res, next) => {
  uploadThumb(req, res, async function(errUpload) {
    req.body = JSON.parse(JSON.stringify(req.body));
    let item = Object.assign(req.body);
      let taskCurrent = (typeof item !== "undefined" && item.id !== "") ? "edit" : "add";
       
    let errors = req.validationErrors() !== false ? req.validationErrors() : [];
    
      if (errUpload) {		
      if(errUpload=='123'){errors.push({param: 'logoHeader',msg:'file k hop le'})}
           if(errUpload.code=='LIMIT_FILE_SIZE'){errors.push({param: 'logoHeader',msg:notify.ERROR_FILE_LARGE})}
        
      }else if(req.file==undefined && taskCurrent=="add"){
          errors.push({param: 'logoHeader',msg:notify.ERROR_FILE_REQUIRE})
      }
      if(errors.length > 0) { 
        if(req.file!=undefined){
            let path='public/adminlte/images/settings/'+ req.file.filename;
			fileHelpers.removeImg(path);
        };
        let categoryItems=[];
        let pageTitle=(taskCurrent=="edit") ? pageTitleEdit : pageTitleAdd;
        await CategoriesModel.listItemsSelectBox().then((item)=>{
            categoryItems=item;
            categoryItems.unshift({_id:'',name:'Choose group'});     
        });
        res.render(`${folderView}form`, { pageTitle, item, errors,categoryItems});
    }else{
        let massage= (taskCurrent=="edit") ? notify.EDIT_SUCCESS : notify.ADD_SUCCESS;
         if(req.file!=undefined){
            item.logoHeader= req.file.filename;
            if(taskCurrent==="edit") 
            {
                 let path= 'public/backend/adminlte/images/settings/'+ item.image_old;
				 if(item.image_old!=''){fileHelpers.removeImg(path);}	
            }
        }else{item.logoHeader=undefined;
            if(taskCurrent==="edit"){item.logoHeader=item.image_old;}
        };
        MainModel.saveItems(item,{task:taskCurrent}).then((result)=>{
            req.flash('success', massage, false);
            res.redirect(linkIndex);
        });
    }
});			
});

module.exports = router;
