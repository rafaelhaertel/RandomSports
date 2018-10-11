'use strict';

// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngTouch', 'ngMap', 'myApp.filters', 'myApp.services', 'myApp.directives']);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/welcome', {templateUrl: 'partials/welcome/index.html', controller: 'MainController'});
  $routeProvider.when('/result/:id', {templateUrl: 'partials/result/index.html', controller: 'MainController'});
  $routeProvider.otherwise({redirectTo: '/welcome'});
}]);


