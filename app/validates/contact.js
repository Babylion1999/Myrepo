const util  = require('util');
const notify= require(__path_configs + 'notify');

const options = {
    name: { min: 5, max: 80 },
   
}

module.exports = {
    validator: (req) => {
        // NAME
        req.checkBody('message', util.format(notify.ERROR_NAME, options.name.min, options.name.max) )
            .isLength({ min: options.name.min, max: options.name.max })
        // twitter
        req.checkBody('name', util.format(notify.ERROR_NAME, options.name.min, options.name.max) )
            .isLength({ min: options.name.min, max: options.name.max })
        // instagram
        req.checkBody('email', util.format(notify.ERROR_NAME, options.name.min, options.name.max) )
            .isLength({ min: options.name.min, max: options.name.max })
        // pinterest
        req.checkBody('subject', util.format(notify.ERROR_NAME, options.name.min, options.name.max) )
        .isLength({ min: options.name.min, max: options.name.max })
        
       
    }
}