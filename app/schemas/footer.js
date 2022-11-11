const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

var schema = new mongoose.Schema({ 
    copyright: String,
    content: String,
    logoFooter: String,     
});

module.exports = mongoose.model(databaseConfig.col_footer, schema );