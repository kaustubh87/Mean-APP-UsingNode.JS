var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Promos = require('../models/promotions');
var Verify = require('./verify');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
  Promos.find({}, function(err, promos){
    if(err) throw err;
    res.json(promos);
  });
})
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res,next){
  Promos.create(req.body, function(err, promos){
    if(err) throw err;

    console.log('Promotion Created');
    var id = promos._id;
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Added the promotions with id: ' +id);

  });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req,res,next){
  Promos.remove({}, function(err, response){
    if(err) throw err;
    res.json(response);
  });
});

promoRouter.route('/:promoId')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
  Promos.findById(req.params.promoId, function(err, promos){
      if(err) throw err;
      res.json(promos);
  });
})
.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req,res,next){
  Promos.findByIdAndUpdate(req.params.promoId, {
    $set: req.body
  }, {
    new: true
  }, function(err, promos){
      if(err) throw err;
      res.json(promos);
  });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin,function(req,res,next){
  Promos.findByIdAndRemove(req.params.promoId, function(err, response){
    if(err) throw err;
    res.json(response);
  });
  
});

module.exports = promoRouter;
