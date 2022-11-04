var express = require('express');
var router = express.Router();
const util = require('util');

// const users = require('../../services/backend/users');
const {body, validationResult} = require('express-validator');
const ItemsModel = require(__path_services + `backend/items`);
const NavbarModel = require(__path_services + `backend/navbar`);
const ValidateNavbar	= require(__path_validates + 'navbar');
const folderView	 = __path_views_admin + 'pages/navbar/';
const notify  		= require(__path_configs + 'notify');
const systemConfig  = require(__path_configs + 'system');
const ParamsHelpers = require(__path_helpers + 'params');
const StringHelpers = require(__path_helpers + 'string');
const UtilsHelpers 	= require(__path_helpers + 'utils-navbar');


const pageTitleIndex = 'navbar Management';
const pageTitleAdd   = pageTitleIndex + ' - Add';
const pageTitleEdit  = pageTitleIndex + ' - Edit';

const linkIndex		 = '/' + systemConfig.prefixAdmin + '/navbar/';

// List items

/* GET home page. */
router.get('(/status/:status)?', async function(req, res, next) {
	//test
	
	let objWhere	 = {};
  
  let keyword		 = ParamsHelpers.getParam(req.query, 'keyword', '');
	let currentStatus= ParamsHelpers.getParam(req.params, 'status', 'all'); 
  let statusFilter = await UtilsHelpers.createFilterStatus(currentStatus);
  let listMenu = await NavbarModel.listItems();
  let title= req.query.title;
  let pagination 	 = {
		totalItems		 : 1,
		totalItemsPerPage: 5,
		currentPage		 : parseInt(ParamsHelpers.getParam(req.query, 'page', 1)),
		pageRanges		 : 3
	};
	if(currentStatus !== 'all') objWhere.status = currentStatus;
	if(keyword !== '') objWhere.name = new RegExp(keyword, 'i');
	
	//
	let meme = await NavbarModel.listItems(objWhere,pagination) ; 	
	res.render(`${folderView}list`, { pageTitle   : 'NavbarPage ',
      massage: title,
      items:meme,
      keyword,
      currentStatus,
      statusFilter,
      pagination,
	  listMenu
 
    });
  

});
// ajax
router.post('/ajax', (req, res, next) => {
	req.body.modified = {userId: 0,username: 'admin',time: Date.now()};
	NavbarModel.updateOne(req.body).then(() => {
		console.log(req.body);
		res.send(req.body);
	});
});
// Change status
router.get('/change-status/:id/:status', async(req, res, next) => {
	let currentStatus	= ParamsHelpers.getParam(req.params, 'status', 'active'); 
	let id				= ParamsHelpers.getParam(req.params, 'id', ''); 
	let status			= (currentStatus === "active") ? "inactive" : "active";
	let data = { status:status,
		modified:{
			item_id: 0,
			item_name: "0",
			time: Date.now(),
		},

	};
	
	NavbarModel.changeStatus(id,data).then((result)=>{
		// req.flash('success', notify.CHANGE_STATUS_SUCCESS, false);
		// res.redirect(linkIndex);
	})
	res.send({success:true,id:id,status:status})
		
});



// Change status - Multi
router.post('/change-status/:status', async(req, res, next) => {
	let currentStatus	= ParamsHelpers.getParam(req.params, 'status', 'active'); 
	let data = { status:currentStatus,
		modified:{
			item_id: 0,
			item_name: "0",
			time: Date.now(),
		},

	};
	
	await NavbarModel.changeStatusMulti({$in: req.body.cid },data).then((result)=>{
	req.flash('success', util.format(notify.CHANGE_STATUS_MULTI_SUCCESS, result.n) , false);
		res.redirect(linkIndex);
	})
});
// Change ordering - Multi
router.post('/change-ordering', async(req, res, next) => {
	let cids 		= req.body.cid;
	let orderings 	= req.body.ordering;
	
	
	
	NavbarModel.changeOrdering(orderings,cids,null).then((result)=>{
		// req.flash('success', notify.CHANGE_ORDERING_SUCCESS, false);
		// res.redirect(linkIndex);
	});
	res.send({success:true,cids:cids,orderings:orderings})
	
	
});
// Delete
router.get('/delete/:id', (req, res, next) => {
	let id				= ParamsHelpers.getParam(req.params, 'id', ''); 	
	NavbarModel.delete(id).then((result)=>{
		req.flash('success', notify.DELETE_SUCCESS, false);
		res.redirect(linkIndex);
	})
	
		
	
});
// Delete - Multi
router.post('/delete', (req, res, next) => {
	NavbarModel.deleteMulti({$in: req.body.cid }).then((result)=>{
		req.flash('success', util.format(notify.DELETE_MULTI_SUCCESS, result.n), false);
		res.redirect(linkIndex);
	})
	
});

// FORM
router.get(('/form(/:id)?'),async (req, res, next) => {
	
	let id		= ParamsHelpers.getParam(req.params, 'id', '');
	let item	= {name: '', ordering: 0, status: 'novalue', price:0};
	let errors   = null;
	let listMenu = await NavbarModel.listItems();
	if(id === '') { // ADD
		res.render(`${folderView}form`, { pageTitle: pageTitleAdd, item, errors,listMenu});	
	}else { // EDIT
		NavbarModel.form(id,null).then((item)=>{
			res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, errors,listMenu});
		});
			
	}
});

// SAVE = ADD EDIT
router.post('/save', (req, res, next) => {
	req.body = JSON.parse(JSON.stringify(req.body));
	ValidateNavbar.validator(req);

	let item = Object.assign(req.body);
	let errors = req.validationErrors();
	
	
	if(typeof item !== "undefined" && item.id !== "" ){	// edit
		console.log("update");
		if(errors) { 
			res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, errors});
		}else {
			NavbarModel.saveItems(item,{task:'edit'}).then((result)=>{
				ItemsModel.saveItems(item,{task:'change-category-name'}).then((result)=>{
					req.flash('success', notify.EDIT_SUCCESS, false);
					res.redirect(linkIndex);
				})	
			});
			
		}
	}else { // add

		
		if(errors) { 
			res.render(`${folderView}form`, { pageTitle: pageTitleAdd, item, errors});
		}else {

			NavbarModel.saveItems(item,{task:'add'}).then((result)=>{
				req.flash('success', notify.ADD_SUCCESS, false);
			 	res.redirect(linkIndex);	
			});
			
		}
	}	
});



module.exports = router;
