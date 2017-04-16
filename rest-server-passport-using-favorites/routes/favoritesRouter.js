var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Favorites = require('../models/favorites');

var favoritesRouter = express.Router();
favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req,res,next){

  Favorites.find({})
   .exec(function(err, favs){
    if(err) throw err;
    res.json(favs);
  });

})
.post(Verify.verifyOrdinaryUser, function(req,res,next){

  var id = req.body._id;
  //console.log(id);
  var Favorite = new Favorites({
    postedBy : req.decoded._doc._id,
    dish: id

})
.delete(Verify.verifyOrdinaryUser, function(req,res,next){

  res.end('Deleting all Favorites')
  Favorites.remove({}, function(err, response){
    if(err) throw err;
    res.json(response);
  });

});

Favorites.create(Favorite, function(err, fav){
    if(err)
    {
      throw err;
    }
    fav.dishes.push(req.body);
    res.json(fav);
  });


});

favoritesRouter.route('/:dishId')
.delete(function(req,res,next){

  Favorites.findByIdAndRemove(req.params.dishId, function(err, response){
    if(err) throw err;
    res.json(response);
  });

});



module.exports = favoritesRouter;
