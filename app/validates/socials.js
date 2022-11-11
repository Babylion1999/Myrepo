const util  = require('util');
const notify= require(__path_configs + 'notify');

const options = {
    name: { min: 5, max: 80 },
   
}

module.exports = {
    validator: (req) => {
        // NAME
        req.checkBody('facebook', util.format(notify.ERROR_NAME, options.name.min, options.name.max) )
            .isLength({ min: options.name.min, max: options.name.max })
        // twitter
        req.checkBody('twitter', util.format(notify.ERROR_NAME, options.name.min, options.name.max) )
            .isLength({ min: options.name.min, max: options.name.max })
        // instagram
        req.checkBody('instagram', util.format(notify.ERROR_NAME, options.name.min, options.name.max) )
            .isLength({ min: options.name.min, max: options.name.max })
        // pinterest
        req.checkBody('pinterest', util.format(notify.ERROR_NAME, options.name.min, options.name.max) )
        .isLength({ min: options.name.min, max: options.name.max })
        
       
    }
}