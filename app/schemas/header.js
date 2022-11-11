const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

var schema = new mongoose.Schema({ 
    logoHeader: String,     
});

module.exports = mongoose.model(databaseConfig.col_header, schema );