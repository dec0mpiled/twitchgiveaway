var express = require('express');
var router = express.Router();
var app = express();
var ID = require('../models/id');
var CODE = require('../models/code');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LiimbixTV' });
});

router.get('/thanks', function(req, res, next) {
  res.render('thanks', { title: 'Good Luck!' });
});

router.get('/secretpanel', function(req, res, next) {
    
    CODE.findOne({name:"admin"}, function(err, me) {
        
        if (err) throw err;
        
        if (me) {
    
  ID.find({code:me.code}, function(err, users) {
      
      if (err) throw err;
      
      res.render('secretpanel', { title: 'Seeeecret', gusers:users, code:me.code});
      
  });
      
  } else {
      
  res.render('secretpanel', { title: 'Seeeecret'});
  
  };
  

});
});

router.get('/clearcode', function(req, res, next) {
  
  CODE.findOneAndRemove({name:"admin"}, function(err, me) {
      
      if (err) throw err;
      
  });
  
  res.redirect("/");
  
});

router.post("/setcode", function(req, res, next) {
    
    CODE.findOneAndRemove({name:"admin"}, function(err, me) {
      
      if (err) throw err;
      
  });
    
  var nCODE = new CODE ({
      
      name: "admin",
      code: req.body.newcodebox
      
  }); 
  
  nCODE.save();
  res.redirect("/")
    
});

router.post("/submit", function(req, res, next) {
    
    if ( req.body.codebox == "toeking" ) {
        
        res.redirect('/secretpanel');
        
    }
    
    CODE.findOne({name:"admin"}, function(err, me) {
        
        if (err) throw err;
        
    if (me) {
    
         if (req.body.codebox == "" || req.body.namebox == ""){
        
        res.render("index", {alertmsg: "Both fields must be filled!"});
        
    } else if (req.body.codebox != me.code) {
        
     res.render("index", {alertmsg: "That giveaway code is invalid! Please check my stream for the code."});
        
    } else if (req.body.codebox != "" && req.body.namebox != "" && req.body.codebox == me.code)  {
    
    
var newID = new ID({
    
    username: req.body.namebox,
    code: req.body.codebox
    
  });
  
  newID.save()
  res.redirect("/thanks")
    }
            
    } else {
        
        res.render("index", {alertmsg: "There is no giveaway going on currently, check back soon."});
        
    }
});
});

module.exports = router;
