const mongoose = require('mongoose');

const SubListSchema = new mongoose.Schema({
  
    list:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

});

const sublist = mongoose.model('sublist', SubListSchema);

module.exports = sublist;
