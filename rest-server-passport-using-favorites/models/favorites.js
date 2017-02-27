var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dishSchema = new Schema({
  dish: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish'
  }
});

var favoriteSchema = new Schema({

  dishes: [dishSchema],
  postedBy: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
    timestamps: true,


});

var Favorites = mongoose.model('Favorites', favoriteSchema);
module.exports = Favorites;
