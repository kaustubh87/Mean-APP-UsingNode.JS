var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1');

//Connection url
var url = "mongodb://localhost:27017/conFusion";
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){

  console.log('Connected succesfully to the server');

  Dishes.create({
    name: 'Uthapizza',
    description: 'Test'
  }, function(err, dish){
      if(err) throw err;
      console.log('Dish created');
      console.log(dish);

      var id = dish._id;

      //get all dishes

      setTimeout(function(){
          Dishes.findByIdAndUpdate(id, {
            $set: {
              description: 'Updated test'
            }
          },{
              new: true // returns updated dish else returns existing dish
          })
          .exec(function(err, dish){
            if(err) throw err;
            console.log('Updated dish!');
            console.log(dish);

            db.collection('dishes').drop(function(){
              db.close();
            });
          });

      }, 3000);
  });

});
