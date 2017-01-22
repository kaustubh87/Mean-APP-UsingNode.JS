var mongoose = require('mongoose'),
    assert = require('assert');

var Leaders = require('./models/leadership');

var url = "mongodb://localhost:27017/conFusion";
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
   console.log('Connected successfully to the server'); 
    
    Leaders.create({
       
      name: 'Peter Pan',
      image: 'images/alberto.png',
      designation: 'Chief Epicurious Officer',
      abbr: 'CEO',
      description: 'Our CEO, Peter, . . .'

    }, function(err, leader){
        if(err) throw err;
      console.log('Dish created');
      console.log(leader);
        
        var id = leader._id;
        
        setTimeout(function(){
            Leaders.findByIdAndUpdate(id, {
                $set :{
                    abbr: 'EVP'
                }
            },{
                new: true
            }).exec(function(err, leader){
                if(err) throw err;
            console.log('Updated dish!');
            console.log(leader);
                
                leader.save(function(err,leader){
                    console.log('Updated comments');
              console.log(leader);
                    
                    
                });
            });
        }, 3000);
    });
});


