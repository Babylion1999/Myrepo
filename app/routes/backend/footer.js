var express = require('express');
var router = express.Router();
const util = require('util');
const fs = require('fs');
const changeName = "footer";
const MainModel 	= require(__path_services + `backend/${changeName}`);
const ValidateArticles	= require(__path_validates + `${changeName}`);
const folderView	 = __path_views_admin + `pages/${changeName}/`;
const notify  		= require(__path_configs + 'notify');
const systemConfig  = require(__path_configs + 'system');
const ParamsHelpers = require(__path_helpers + 'params');
const pageTitleIndex = 'Articles Management';
const pageTitleAdd   = pageTitleIndex + ' - Add';
const pageTitleEdit  = pageTitleIndex + ' - Edit';
const fileHelpers = require(__path_helpers + 'upload');
const uploadlogoFooter = fileHelpers.uploadImg('logoFooter','backend/adminlte/images/footer')
const linkIndex		 = '/' + systemConfig.prefixAdmin + `/${changeName}/`+"form/636b6cd119a28f09eb90ce19";
const notifier = require('node-notifier');

// List items
router.get('(/status/:status)?', async function(req, res, next) {

    let objWhere	 = {};
    
    
    let title= req.query.title;
    
      MainModel.listItems(objWhere).then((items)=>{
          
          res.render(`${folderView}list`, { pageTitle   : 'footerPage ',
        massage: title,
        items,
        
      });
      });
  });
// FORM
router.get(('/form(/:id)?'), async(req, res, next) => {
	
	let id		= ParamsHelpers.getParam(req.params, 'id', '');
	let item	= {};
	let errors   = null;
	
	if(id === '') { // ADD
		res.render(`${folderView}form`, {pageTitle: pageTitleAdd, item, errors});	
	}else { // EDIT
		MainModel.form(id).then((item)=>{
            
			res.render(`${folderView}form`, {pageTitle: pageTitleEdit, item, errors});
		});
		
	}
});
// SAVE = ADD EDIT
router.post('/save', async(req, res, next) => {
     uploadlogoFooter(req, res, async function(errUpload) {
	req.body = JSON.parse(JSON.stringify(req.body));
	let item = Object.assign(req.body);
    let taskCurrent = (typeof item !== "undefined" && item.id !== "") ? "edit" : "add";
     ValidateArticles.validator(req);
	let errors = req.validationErrors() !== false ? req.validationErrors() : [];
	
    if (errUpload) {		
		if(errUpload=='123'){errors.push({param: 'logoFooter',msg:'file k hop le'})}
         if(errUpload.code=='LIMIT_FILE_SIZE'){errors.push({param: 'logoFooter',msg:notify.ERROR_FILE_LARGE})}
			
    }else if(req.file==undefined && taskCurrent=="add"){
        errors.push({param: 'logoFooter',msg:notify.ERROR_FILE_REQUIRE})
    }
	if(errors.length > 0) { 
        if(req.file!=undefined){
            let path='public/adminlte/images/footer/'+ req.file.filename;
			fileHelpers.removeImg(path);
        };
       
        let pageTitle=(taskCurrent=="edit") ? pageTitleEdit : pageTitleAdd;
        res.render(`${folderView}form`, { pageTitle, item, errors});
    }else{
        let massage= (taskCurrent=="edit") ? notify.EDIT_SUCCESS : notify.ADD_SUCCESS;
         if(req.file!=undefined){
            item.logoFooter= req.file.filename;
            if(taskCurrent==="edit") 
            {
                 let path= 'public/backend/adminlte/images/footer/'+ item.image_old;
				 if(item.image_old!=''){fileHelpers.removeImg(path);}	
            }
        }else{item.logoFooter=undefined;
            if(taskCurrent==="edit"){item.logoFooter=item.image_old;}
        };
        MainModel.saveItems(item,{task:taskCurrent}).then((result)=>{
            req.flash('success', massage, false);
            res.redirect(linkIndex);
        });
    }
});			
});



module.exports = router;
