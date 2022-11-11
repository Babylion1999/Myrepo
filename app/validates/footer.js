const util  = require('util');
const notify= require(__path_configs + 'notify');

const options = {
    copyright: { min: 5, max: 80 },
    content: { min: 5, max: 300 },
   
}

module.exports = {
    validator: (req) => {
        // NAME
        req.checkBody('copyright', util.format(notify.ERROR_NAME, options.copyright.min, options.copyright.max) )
            .isLength({ min: options.copyright.min, max: options.copyright.max });
        req.checkBody('content', util.format(notify.ERROR_NAME, options.content.min, options.content.max) )
            .isLength({ min: options.content.min, max: options.content.max })
       
        
       
    }
}