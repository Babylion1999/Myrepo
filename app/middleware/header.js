const HeaderModel 	= require(__path_services + `backend/header`);
const SettingsModel 	= require(__path_services + `backend/settings`);

module.exports = async(req, res, next) => {
    let itemsHeader=[];
  const header = await SettingsModel.listItems({}).then((items)=>{
    itemsHeader= items;
    
    
    return itemsHeader
  });
  res.locals.itemsHeader = header;

  next();
}