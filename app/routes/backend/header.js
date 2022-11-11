var express = require('express');
var router = express.Router();
const util = require('util');
const fs = require('fs');
const {body, validationResult} = require('express-validator');
const changeName = "header";
const MainModel 	= require(__path_services + `backend/${changeName}`);
const ValidateArticles	= require(__path_validates + `${changeName}`);
const folderView	 = __path_views_admin + `pages/${changeName}/`;
const notify  		= require(__path_configs + 'notify');
const systemConfig  = require(__path_configs + 'system');
const ParamsHelpers = require(__path_helpers + 'params');
const UtilsHelpers 	= require(__path_helpers + `utils-${changeName}`);
const pageTitleIndex = 'Articles Management';
const pageTitleAdd   = pageTitleIndex + ' - Add';
const pageTitleEdit  = pageTitleIndex + ' - Edit';
const fileHelpers = require(__path_helpers + 'upload');
const uploadlogoHeader = fileHelpers.uploadImg('logoHeader','backend/adminlte/images/header')
const linkIndex		 = '/' + systemConfig.prefixAdmin + `/${changeName}/`+"form/6369e5dd34be243164f97ac0";
const notifier = require('node-notifier');

// List items

// FORM
router.get(('/form/:id'), async(req, res, next) => {
	
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
     uploadlogoHeader(req, res, async function(errUpload) {
	req.body = JSON.parse(JSON.stringify(req.body));
	let item = Object.assign(req.body);
    let taskCurrent = (typeof item !== "undefined" && item.id !== "") ? "edit" : "add";
     ValidateArticles.validator(req);
	let errors = req.validationErrors() !== false ? req.validationErrors() : [];
	
    if (errUpload) {		
		if(errUpload=='123'){errors.push({param: 'logoHeader',msg:'file k hop le'})}
         if(errUpload.code=='LIMIT_FILE_SIZE'){errors.push({param: 'logoHeader',msg:notify.ERROR_FILE_LARGE})}
			
    }else if(req.file==undefined && taskCurrent=="add"){
        errors.push({param: 'logoHeader',msg:notify.ERROR_FILE_REQUIRE})
    }
	if(errors.length > 0) { 
        if(req.file!=undefined){
            let path='public/adminlte/images/header/'+ req.file.filename;
			fileHelpers.removeImg(path);
        };
       
        let pageTitle=(taskCurrent=="edit") ? pageTitleEdit : pageTitleAdd;
        res.render(`${folderView}form`, { pageTitle, item, errors});
    }else{
        let massage= (taskCurrent=="edit") ? notify.EDIT_SUCCESS : notify.ADD_SUCCESS;
         if(req.file!=undefined){
            item.logoHeader= req.file.filename;
            if(taskCurrent==="edit") 
            {
                 let path= 'public/backend/adminlte/images/header/'+ item.image_old;
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
