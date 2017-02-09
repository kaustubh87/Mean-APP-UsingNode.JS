var express = require('express');
var router = express.Router();
var passport  = require('passport');
var User = require('../models/user');
var Verify = require('./verify');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/register', function(req,res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err)
    {
      return err.status(500).json({err: err});
    }

    passport.authenticate('local')(req,res,function(){
       return res.status(200).json({status: 'Registration Successful'});
    });
  });

});

module.exports = router;
