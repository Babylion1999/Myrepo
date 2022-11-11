const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

var schema = new mongoose.Schema({ 
    message: String, 
    name: String,
    email: String,
    subject: String,
});

module.exports = mongoose.model(databaseConfig.col_contact, schema );