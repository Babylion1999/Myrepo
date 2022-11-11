const { options } = require("mongoose");
const MainModel 	= require(__path_schemas + 'socials');
const CategoriesModel 	= require(__path_schemas + 'categories');
module.exports = {
    listItems:async(objWhere)=>{    
        return MainModel
            .find(objWhere)    
    },
    form: async(id, options=null)=>{
        let result='';
        result = await MainModel.findById(id).then(res=>{
            return res
        }).catch(err=>{
            return
        }); 
        return result
    },
    saveItems: (item,options=null)=>{
        if(options.task=='add'){ 
            return new MainModel(item).save()
        }else if(options.task=='edit'){
            return MainModel.updateOne({_id: item.id}, {
                facebook: item.facebook,
                twitter: item.twitter,
                instagram: item.instagram,
                pinterest: item.pinterest,
            });
        }
    }
}