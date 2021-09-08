const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const list = require('../models/list')
// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated,async (req, res) =>{

  
var data = await list.find({user:req.user.email} )

res.render('dashboard',{user:req.user, data:data});

});

module.exports = router;
