const { options } = require("mongoose");
const fs = require('fs');
const MainModel 	= require(__path_schemas + 'settings');
const CategoriesModel 	= require(__path_schemas + 'categories');
const fileHelpers = require(__path_helpers + 'upload');
const StringHelper 	= require(__path_helpers + 'string');
module.exports = {
    listItems:async(objWhere,pagination,categoryItems,sort,categoryID)=>{   
        
        await CategoriesModel.find({},{_id:1, name:1}).then((item)=>{
            categoryItems=item;
            categoryItems.unshift({_id:'allvalue',name:'Choose group'})
        });
        
        await MainModel.count(objWhere).then( (data) => {
            pagination.totalItems = data;
    
        });
        
        return MainModel
            .find(objWhere)
            .sort(sort)
            .skip((pagination.currentPage-1) * pagination.totalItemsPerPage)
            .limit(pagination.totalItemsPerPage)
    
    },
    getLogo:(param=null,options =null)=>{
        if(options.task=='get-logo-header'){
            return MainModel
            .find({})
            .select('logoHeader')
        }
    },
    listItemsFrontend:(params = null, options = null)=>{
        
        if(options.task=='list-artical'){
            return MainModel
            .find({status: 'active',special:'active'})
            .select('name created category.name thumb')
            .limit(9)
            .sort({ordering:'asc'})
        }
        if(options.task=='items-all-articles'){
            return MainModel
            .find({status: 'active'})
            .select('name category.name thumb')
            .sort({ordering:'asc'})
        }
            
        
       
        
    },
    changeStatus:(id,data)=>{
        return MainModel.updateOne({_id: id}, data)
    },
    changeSpecial:(id,data)=>{
        return MainModel.updateOne({_id: id}, data)
    },
    changeStatusMulti: (ids,data)=>{
        return MainModel.updateMany({_id: ids}, data)
    },
    changeOrdering: async(orderings,cids,options=null)=>{
        let data = { ordering: parseInt(orderings),
            modified:{
                user_id: 0,
                user_name: "0",
                time: Date.now(),
            },
        };
        if(Array.isArray(cids)) {
            for (let index = 0; index < cids.length; index++) {
                data.ordering= parseInt(orderings[index]);
                await MainModel.updateOne({_id: cids[index]},data);
            }
            return Promise.resolve("Success");
        }else{
            return MainModel.updateOne({_id: cids}, data);
        };
    },
    delete:  async(id)=>{
        await MainModel.findById(id).then((item)=>{
            let path='public/backend/adminlte/images/articles/'+item.thumb;
            
            if(fs.existsSync(path))
            fs.unlink(path, (err) => {
                        if (err) throw err;
                        console.log('successfully deleted /tmp/hello');
                      });
        });
       
        return MainModel.deleteOne({_id: id})
    },
    deleteMulti: async(cids)=>{
    
        if(Array.isArray(cids)){
            for (let index = 0; index < cids.$in.length; index++) {
            
                await MainModel.findById(cids.$in[index]).then((item)=>{
                    let path='public/backend/adminlte/images/articles/'+item.thumb;
                    fileHelpers.removeImg(path);            
                });
            }
        }else{
            await MainModel.findById(cids.$in).then((item)=>{
                let path='public/adminlte/images/articles/'+item.thumb;
                fileHelpers.removeImg(path);        
            });
        }
        
      
        return MainModel.remove({_id: cids})
    },
    form: (id, options=null)=>{
        return MainModel.findById(id);
    },
    saveItems: (item,options=null)=>{
        if(options.task=='add'){
           
            
            return new MainModel(item).save()

        }else if(options.task=='edit'){
            return MainModel.updateOne({_id: item.id}, {
				
				
                logoHeader: item.logoHeader,
				
			});
        }else if(options.task=='change-category-name'){
            return MainModel.updateMany({'category.id':item.id},{
                category:{
                    id:item.id,
					name: item.name,
				}
            });
        }
    }
}