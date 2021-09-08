const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  
    user:{
        type:String,
        required:true
    },
    count:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    sublist:{
        type:[]
    }

});

const list = mongoose.model('list', ListSchema);

module.exports = list;
