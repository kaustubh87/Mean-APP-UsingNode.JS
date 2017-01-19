var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description : {
    type: String,
    required : true
  }
},
  {
  timestamps: true  //Created at and Updated at are two fields
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;
