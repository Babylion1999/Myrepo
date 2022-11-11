var express = require('express');
var router = express.Router();
const util = require('util');
const changeName = "socials";
const MainModel 	= require(__path_services + `backend/${changeName}`);
const CategoriesModel = require(__path_services + `backend/categories`);
const ValidateSocials	= require(__path_validates + `${changeName}`);
const folderView	 = __path_views_admin + `pages/${changeName}/`;
const notify  		= require(__path_configs + 'notify');
const systemConfig  = require(__path_configs + 'system');
const ParamsHelpers = require(__path_helpers + 'params');
const UtilsHelpers 	= require(__path_helpers + `utils-${changeName}`);
const pageTitleIndex = 'Social Management';
const pageTitleAdd   = pageTitleIndex + ' - Add';
const pageTitleEdit  = pageTitleIndex + ' - Edit';

const linkIndex		 = '/' + systemConfig.prefixAdmin + `/${changeName}/`+"form/6367d3c8457c060bacd947af";

// List social

/* GET home page. */

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
	req.body = JSON.parse(JSON.stringify(req.body));
	ValidateSocials.validator(req);
	let item = Object.assign(req.body);
	let errors = req.validationErrors();
	let taskCurrent = (typeof item !== "undefined" && item.id !== "") ? "edit" : "add";
	console.log(item.id);
		if(errors) { 	
			let pageTitle=(taskCurrent=="edit") ? pageTitleEdit : pageTitleAdd;
			res.render(`${folderView}form`, { pageTitle, item, errors});
		}else{
			let massage= (taskCurrent=="edit") ? notify.EDIT_SUCCESS : notify.ADD_SUCCESS;
				MainModel.saveItems(item,{task:taskCurrent}).then((result)=>{
				req.flash('success', massage, false);
				res.redirect(linkIndex);
			});
			
			
		}		
});

module.exports = router;
