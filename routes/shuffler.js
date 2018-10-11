var teamsAfter = {};
var Draw = require('../models/draw.js');
var moment = require("moment");

exports.randomTeams = function(req, res) {
  console.log(req.body)

  team = req.body.players;
  type = req.body.type;
  drawid = req.body.id;

  console.log(team)
  console.log(type)
  var team1 = [];
  var team2 = [];
  var response = {};


  okall = false;
  var count = 0;
  
  while(okall != true) {
    ok = false;
    okstamina = false;
    // console.log("okstamina begin " + okstamina)
    // console.log("okskill begin " + ok)
    team1 = [];
    team2 = [];
    skilltotal = team.reduce((sum, item) => sum + item.skill, 0)
    staminatotal = team.reduce((sum, item) => sum + item.stamina, 0)
    // console.log("stamina total " + staminatotal);

    shuffle(team);

  //   for (i=0; i<=9; i++) {
  //   if(i<=4)
  //     team1[i] = team[i];

  //   if(i>4)
  //     team2[i-5] = team[i];
  //   }

    var position1 = [];
    var position2 = [];
    var position3 = [];
    var position4 = [];
    var position5 = [];


    if((type == 1) || (type == 2) || (type == 3) || (type == 4)){
      for (i=0; i<=team.length-1; i++) {
        if(team[i].position == "GK")
          position1.push(team[i]);
        if(team[i].position == "DF")
          position2.push(team[i]);
        if(team[i].position == "MF")
          position3.push(team[i]);
        if(team[i].position == "CF")
          position4.push(team[i]);
      }
    }

    if((type == 5) || (type == 6)){
      for (i=0; i<=team.length-1; i++) {
        if(team[i].position == "PG")
          position1.push(team[i]);
        if(team[i].position == "SG")
          position2.push(team[i]);
        if(team[i].position == "SF")
          position3.push(team[i]);
        if(team[i].position == "PF")
          position4.push(team[i]);
        if(team[i].position == "C")
          position5.push(team[i]);
      }
    }


    var halfpos1 = Math.ceil(position1.length / 2);    
    team1 = team1.concat(position1.slice(0,halfpos1));
    team2 = team2.concat(position1.slice(halfpos1,position1.length));
    var halfpos2 = Math.ceil(position2.length / 2);    
    team1 = team1.concat(position2.slice(0,halfpos2));
    team2 = team2.concat(position2.slice(halfpos2,position2.length));
    var halfpos3 = Math.ceil(position3.length / 2);    
    team1 = team1.concat(position3.slice(0,halfpos3));
    team2 = team2.concat(position3.slice(halfpos3,position3.length));
    var halfpos4 = Math.ceil(position4.length / 2);    
    team1 = team1.concat(position4.slice(0,halfpos4));
    team2 = team2.concat(position4.slice(halfpos4,position4.length));
    // console.log("stamina do team1 dentro do loop " + team1.reduce((sum, item) => sum + item.stamina, 0))

    count++;
    console.log(count)

    if(team1.length > team2.length) {
      teamaux = []; 
      teamaux = team1.concat(team2)

      team1 = [];
      team1 = team1.concat(teamaux.slice(0,Math.floor(teamaux.length / 2)));
      team2 = [];
      team2 = team2.concat(teamaux.slice(Math.floor(teamaux.length / 2),teamaux.length));
    }
    

    // while(ok != true){
    checkskill(team1, skilltotal);
    checkstamina(team1, staminatotal);

    if ((okstamina && ok) == true)
      okall = true;
	
	}


  data = moment(Date.now());
  data = data.format();

  newDraw = Draw({ 
    type: type,
    date: data, 
    teamone: team1,
    teamtwo: team2,
    players: team 
  });

  newDraw.save(function(err) {
    if (err) {
      res.send('Erro = ' + err, 400);
      throw err;
    }
    console.log(newDraw);
    res.send(newDraw._id, 200);
  });

	// response.team1 = team1;
	// response.team2 = team2;

	// teamsAfter = response;

	// console.log(response)
	// res.json(response);


};

exports.getTeams = function(req, res) {
	
  Draw.findById(req.params.id, function(err, user) {
    if (err) {
      res.send('Error = ' + err, 400);
      throw err;
    }
    else {
      draw = user;

      res.setHeader('Content-Type', 'application/json');
      res.json(draw);
    }
  });
}


	function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        var randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        var temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    function checkskill(teamone, skilltot){
      
      reduce = teamone.reduce((sum, item) => sum + item.skill, 0);
      // console.log("reduce" + reduce);
      // console.log("metade do skill total " + Math.ceil(skilltot / 2));
      if(reduce == Math.floor(skilltot / 2))
        ok = true;
    }

    function checkstamina(teamone, staminatot){
      
      reducesta = teamone.reduce((sum, item) => sum + item.stamina, 0);
      // console.log("reduce" + reducesta);
      // console.log("metade da stamina total " + Math.floor(staminatot / 2));
      if(reducesta == Math.ceil(staminatot / 2))
        okstamina = true;
    }




    // $scope.shuffler = function (team, type) {
      

    //     // console.log("okstamina end " + okstamina)
    //     // console.log("okskill end " + ok)

    //     // }

    //     for(i=0; i < (team1.length); i++)
    //       document.getElementById("team1").innerHTML = document.getElementById("team1").innerHTML + '<td  class="blue">' + team1[i].name + " <h6>POS: " + team1[i].position + " <h6>SKILL: " + team1[i].skill + " <h6>STAMINA: " + team1[i].stamina + '</h6></h6></h6></td>';  
    //     for(i=0; i < (team2.length); i++)
    //       document.getElementById("team2").innerHTML = document.getElementById("team2").innerHTML + '<td  class="red">' + team2[i].name + " <h6>POS: " + team2[i].position + " <h6>SKILL: " + team2[i].skill + " <h6>STAMINA: " + team2[i].stamina + '</h6></h6></h6></td>';
        
    //     document.getElementById("teamone").innerHTML = document.getElementById("teamone").innerHTML + team1.reduce((sum, item) => sum + item.skill, 0) + " STAMINATOTAL: " + team1.reduce((sum, item) => sum + item.stamina, 0) ;
    //     document.getElementById("teamtwo").innerHTML = document.getElementById("teamtwo").innerHTML + team2.reduce((sum, item) => sum + item.skill, 0) + " STAMINATOTAL: " + team2.reduce((sum, item) => sum + item.stamina, 0) ; ;
    //   }
    // }