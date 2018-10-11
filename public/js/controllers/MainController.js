myApp.controller('MainController', ['$rootScope', '$scope', '$http', '$location', "$routeParams",
  function($rootScope, $scope, $http, $location, $routeParams) {
    $scope.sportselected;
    $scope.sport = ["Soccer 5 a side", "Soccer 6 side", "Soccer 7 a side", "Soccer 11 a side", "Basket 3 a side", "Basket 5 a side"]

    $scope.players = [];

    $scope.positions = [];

    $scope.type;

    $scope.arraysize = 0;

    $scope.team1 = [];

    $scope.link = '';

    $scope.createArrayLength = function (length, sport) {
      $scope.arraysize = length *2;
      $scope.players = [];
      for (i=0 ; i<length*2 ; i++)

        $scope.players.push({'id':length})
    }
 
    $scope.selectedItemChanged = function(){
  
      if($scope.sportselected == 0){
        $scope.players = [{"position":"GK"}, {"position":"GK"}, {"position":"DF"}, {"position":"DF"},{"position":"MF"}, {"position":"MF"}, {"position":"MF"}, {"position":"MF"}, {"position":"CF"}, {"position":"CF"}];
        $scope.type = 1;
      }
      
      if($scope.sportselected == 1){
        //$scope.players =[{"position":"GK","name":"charles","skill":4,"stamina":4},{"position":"GK","name":"ze","skill":4,"stamina":4},{"position":"DF","name":"maicon","skill":4,"stamina":3},{"position":"DF","name":"diego","skill":4,"stamina":5},{"position":"DF","name":"giovane","skill":2,"stamina":3},{"position":"DF","name":"william","skill":3,"stamina":5},{"position":"MF","name":"plinio","skill":3,"stamina":5},{"position":"MF","name":"smaniotto","skill":5,"stamina":5},{"position":"MF","name":"bruno","skill":1,"stamina":3},{"position":"MF","name":"rodrigo","skill":4,"stamina":4},{"position":"CF","name":"rafael","skill":2,"stamina":3},{"position":"CF","name":"andrei","skill":1,"stamina":4}]
        $scope.players = [{"position":"GK"}, {"position":"GK"}, {"position":"DF"}, {"position":"DF"}, {"position":"DF"}, {"position":"DF"}, {"position":"MF"}, {"position":"MF"}, {"position":"MF"}, {"position":"MF"}, {"position":"CF"}, {"position":"CF"}];
        $scope.type = 2;
      }

      if($scope.sportselected == 2){
        $scope.players = [{"position":"GK"}, {"position":"GK"}, {"position":"DF"}, {"position":"DF"}, {"position":"DF"}, {"position":"DF"}, {"position":"MF"}, {"position":"MF"}, {"position":"MF"}, {"position":"MF"}, {"position":"MF"}, {"position":"MF"}, {"position":"CF"}, {"position":"CF"}];
        $scope.type = 3;
      }

      if($scope.sportselected == 3){
        $scope.players = [{"position":"GK"}, {"position":"GK"}, {"position":"DF"}, {"position":"DF"}, {"position":"DF"}, {"position":"DF"}, {"position":"DF"}, {"position":"DF"}, {"position":"DF"}, {"position":"DF"}, {"position":"MF"}, {"position":"MF"}, {"position":"MF"}, {"position":"MF"}, {"position":"MF"}, {"position":"MF"}, {"position":"MF"}, {"position":"MF"}, {"position":"CF"}, {"position":"CF"}, {"position":"CF"}, {"position":"CF"}];
        $scope.type = 4;
      }

      if($scope.sportselected == 4){
        $scope.players = [{"position":"PG"}, {"position":"PG"}, {"position":"SG"}, {"position":"SG"},{"position":"C"}, {"position":"C"}];
        $scope.type = 5;
      }

      if($scope.sportselected == 5){
        $scope.players = [{"position":"PG"}, {"position":"PG"}, {"position":"SG"}, {"position":"SG"},{"position":"SF"}, {"position":"SF"}, {"position":"PF"}, {"position":"PF"}, {"position":"C"}, {"position":"C"}];
        $scope.type = 6;
      }
    }

    $scope.shuffleTeams = function(players, type) {
     
     
      $http({
        url: '/shuffle/',
        method: "POST",
        data: {players: players,
               type:type}
      }).success(function(data) {
        console.log(data)
        $location.path('/result/' + data)
      })
    };

    $scope.redraw = function(players, type) {
      players = $scope.team1.concat($scope.team2);
      
     
      $http({
        url: '/shuffle/',
        method: "POST",
        data: {players: players,
               type:type}
      }).success(function(data) {
        console.log(data)
        $location.path('/result/' + data)
      })
    };

    $scope.getTeams = function () {
      $http({
        url: '/shuffle/' + $routeParams.id,
        method: "GET",
      }).success(function(data) {
        $scope.players = data.players;
        $scope.type = data.type;
        $scope.team1 = data.teamone;
        $scope.team2 = data.teamtwo;

        $scope.team1.skilltot = $scope.team1.reduce((sum, item) => sum + item.skill, 0)
        $scope.team1.staminatot = $scope.team1.reduce((sum, item) => sum + item.stamina, 0)
        $scope.team2.skilltot = $scope.team2.reduce((sum, item) => sum + item.skill, 0)
        $scope.team2.staminatot = $scope.team2.reduce((sum, item) => sum + item.stamina, 0)

        $scope.link = window.location.href;
      })
    };

    $scope.addNewPlayer = function() {
      
        var newItemNo = $scope.players.length+1;
        $scope.players.push({'id':newItemNo});
      
    };

    $scope.removePlayer = function(item, list) {
      var index = list.indexOf(item);
      list.splice(index, 1);
    };

  }]
);