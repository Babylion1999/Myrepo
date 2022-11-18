const util  = require('util');
const notify= require(__path_configs + 'notify');

const options = {
    copyright: { min: 5, max: 100 },
    content: {min: 5, max: 500}, 
}

module.exports = {
    validator: (req) => {
       
         // copyright
        req.checkBody('copyright', util.format(notify.ERROR_COPYRIGHT, options.copyright.min, options.copyright.max) )
        .isLength({ min: options.copyright.min, max: options.copyright.max })
        //content
        req.checkBody('content', util.format(notify.ERROR_CONTENT, options.content.min, options.content.max) )
        .isLength({ min: options.content.min, max: options.content.max })
       
    }
}