var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');
var User = require('../models/user');
var Verify    = require('./verify');

router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/users')
.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res,next){
if(Verify.verifyAdmin){
  User.find({}, function(err,user){
    if(err) throw err;
    res.json(user);
  });
}
else {
  var err = new Error("You are not authorized to perform this operation");
  err.status = 403;
  return next(err);
}
});


module.exports = router;
