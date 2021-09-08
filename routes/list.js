const express = require('express');
const router = express.Router();
const { ensureAuthenticated} = require('../config/auth');
const list = require('../models/list');
const sublist = require('../models/sublist');
var uniqid = require('uniqid'); 
// add new list
router.post('/add',async function(req,res){



    var arr = [{}];
    var item = {user:req.user.email,count:uniqid(),name:"",arr};
    var data = new list(item);
    data.save();

    res.redirect('/dashboard');

});
// add new sublist
router.post('/addsublist',async function(req,res){

    var arr = [{parentlist:req.body.sublist_id , id:uniqid(), title:"", description:""}];
    var temp = await list.findOne({count:req.body.sublist_id});
    var sublist  = temp.sublist;
    sublist.push(arr);
    temp.sublist=sublist;
   await list.findOneAndUpdate({count:req.body.sublist_id},temp,null,function(err,data){
        if(err)
        {
            console.log(err);
        }
        else ;
    })

    res.redirect('/dashboard');

});
// add new sublist
router.post('/listname',async function(req,res){

   await list.findOneAndUpdate({count:req.body.sublist_id},{name:req.body.listname},null,function(err,data){
        if(err)
        {
            console.log(err);
        }
        else ;
    })

    res.redirect('/dashboard');

});
router.post('/add-data-to-sublist',async function(req,res){

    var temp = await list.findOne({count:req.body.parent_id});

    var arr = temp.sublist;
     for (var i = 0; i < arr.length; i++) {
         console.log(arr[i][0].id);
         if(arr[i][0].id==req.body.sublist_id)
         {
            arr[i][0].title=req.body.title;
            arr[i][0].description=req.body.description;
            break;
 
         }
 
     }
     temp.sublist=arr;
     await list.findOneAndUpdate({count:req.body.parent_id},temp,null,function(err,data){
        if(err)
        {
            console.log(err);
        }
        else ;
    })

    res.redirect('/dashboard');

});

// remove  sublist
router.post('/remove-sublist',async function(req,res){

    var temp = await list.findOne({count:req.body.parent_id});

   var arr = temp.sublist;
    for (var i = 0; i < arr.length; i++) {
        if(arr[i][0].id==req.body.sublist_id)
        {
            var spliced = arr.splice(i, 1);
            break;

        }

    }
    temp.sublist=arr;
    // console.log(temp);

   await list.findOneAndUpdate({count:req.body.parent_id},temp,null,function(err,data){
        if(err)
        {
            console.log(err);
        }
        else ;
    })

    res.redirect('/dashboard');

});
// delete list

router.post('/remove',async function(req,res){

    list.findOneAndDelete({count:req.body.id}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
        }
    });
 
    res.redirect('/dashboard');
 });

module.exports = router;
