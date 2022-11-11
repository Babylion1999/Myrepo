const { options } = require("mongoose");
const fs = require('fs');
const MainModel 	= require(__path_schemas + 'footer');
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
                copyright: item.copyright,
                content: item.content,
                logoFooter: item.logoFooter,
			});
        }
    }
}