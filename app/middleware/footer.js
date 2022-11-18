const FooterModel 	= require(__path_services + `backend/footer`);
const SettingsModel 	= require(__path_services + `backend/settings`);

module.exports = async(req, res, next) => {
    let itemsFooter=[];
  const footer = await SettingsModel.listItems({}).then((items)=>{
    itemsFooter= items;
    return itemsFooter
  });
  res.locals.itemsFooter = footer;

  next();
}