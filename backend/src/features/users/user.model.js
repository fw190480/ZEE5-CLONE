const mongoose = require('mongoose');
// creating Schema 
const userSchema = new mongoose.Schema({
  mobileNumber:{
    type:String,
  },
  name:String,
  email:{
    type:String,
    required:true,
    unique:true
  },
  hash:{
    type:String,
    required:true
  }
}, {
    versionKey: false,
    timestamps: true
})

// creating model and exports
const users = mongoose.model('user', userSchema);
module.exports = users