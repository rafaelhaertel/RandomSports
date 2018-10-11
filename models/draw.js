var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var Player = new Schema({
  position: String,
  name: String,
  skill: Number,
  stamina: Number
});

module.exports = mongoose.model('players', Player);

var Draw = new Schema({ 
  id: String,
  type: Number,
  date: Date, 
  teamone: [Player],
  teamtwo: [Player],
  players: [Player]
});

module.exports = mongoose.model('draws', Draw);


