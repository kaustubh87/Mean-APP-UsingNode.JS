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
  Favorites.create(req.body,function(err, favorites){
    var dish_id = req.body.dish_id;
    favorites.dishes.push(dish_id);
    res.json(favorites);
  });
});


module.exports = favoritesRouter;
