const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

var schema = new mongoose.Schema({ 
    facebook: String, 
    twitter: String,
    instagram: String,
    pinterest: String,
});

module.exports = mongoose.model(databaseConfig.col_socials, schema );