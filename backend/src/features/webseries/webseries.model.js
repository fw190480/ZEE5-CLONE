const mongoose = require('mongoose');
// creating Schema 
const webseriesSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    popupTitle: {
        type: String,
        required: true
    },
    audioLangString:{
        type:String
    },
    duration: {
        type: String,
        required: true
    },
    genre1: {
        type: String
    },
    genre2: {
        type: String
    },
    premium:{
        type:Boolean
    }
}, {
    versionKey: false,
    timestamps: true
})

// creating model and exports
const webseries = mongoose.model('webserie', webseriesSchema);
module.exports = webseries