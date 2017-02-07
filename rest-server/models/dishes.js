var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

//Comments Schema

var commentSchema = new Schema({
  rating:{
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  }
},
{
  timestamps: true
});


var dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
      type: String,
      required: true
  },
  category: {
      type: String,
      required: true
  },
  label :{
      type: String,
      required: true
  },
  price: {
      type: Currency
  },
  description : {
    type: String,
    required : true
  },
  comments: [commentSchema]
},
  {
  timestamps: true  //Created at and Updated at are two fields
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;
