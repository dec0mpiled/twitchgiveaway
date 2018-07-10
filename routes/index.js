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
  res.render('secretpanel', { title: 'Seeeecret' });
});

router.post("/setcode", function(req, res, next) {
    
  var nCODE = new CODE ({
      
      name: "admin",
      code: req.body.newcodebox
      
  }); 
  
  nCODE.save();
  res.redirect("/")
    
});

router.post("/submit", function(req, res, next) {
    
    CODE.findOne({name:"admin"}, function(err, me) {
        
        if (err) throw err;
    
    if ( req.body.codebox == "toeking" ) {
        
        res.redirect('/secretpanel');
        
    } else if (req.body.codebox == "" || req.body.namebox == ""){
        
        res.render("index", {alertmsg: "Both fields must be filled!"});
        
    } else if (req.body.codebox != me.code) {
        
     res.render("index", {alertmsg: "That giveaway code is invalid! Please check the stream for the code."});
        
    } else {
    
    
var newID = new ID({
    
    username: req.body.namebox,
    code: req.body.codebox
    
  });
  
  newID.save()
  res.redirect("/thanks")
    }

        
    });
});

module.exports = router;
