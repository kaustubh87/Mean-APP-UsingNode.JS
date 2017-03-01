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
  //req.body.postedBy = req.decoded._doc._id;
  //console.log(req.body.postedBy);
  var Favorite = new Favorites({
    postedBy : req.decoded._doc._id
  });
  Favorite.dishes.push(req.body);
  Favorite.save(id, function(err, fav){
    if(err)
    {
      throw err;
    }

    res.json(fav);
  });

  /*Favorites.create(,function(err, favorites){
    req.body.postedBy = req.decoded._doc._id;
    console.log(req.body.postedBy);
    favorites.dishes.push(req.body);
    res.json(favorites);
  });
  */
});


module.exports = favoritesRouter;
