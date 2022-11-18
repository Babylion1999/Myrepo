const CategoriesModel = require(__path_services + `backend/categories`);
const SocialsModel 	= require(__path_services + `backend/socials`);
module.exports = async(req, res, next) => {
    let itemsCategory=[];
    let itemsSocials=[];
  const listCategory = await CategoriesModel.listItemsFrontend(null, {task: 'items-in-menu'}).then((items)=>{
    itemsCategory=items;
    return itemsCategory
  });
  const listSocials = await SocialsModel.listItems({}).then((items)=>{
    itemsSocials= items;
    return itemsSocials
  });
  res.locals.itemsCategory = listCategory;
  res.locals.itemsSocials = listSocials;

  next();
}