'use strict';

angular
  .module('app')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
      console.log("Starting app.config.route...");
      // For unmatched routes
      $urlRouterProvider.otherwise('/home');

      //Set default routes for empty child route.
      $urlRouterProvider.when('/{coId:int}/Template', '/{coId:int}/template/list');
      $urlRouterProvider.when('/{coId:int}/template/', '/{coId:int}/template/list');

      // Application routes
      $stateProvider
        .state('app', {
          abstract: true, //Means you can't pick this route directly, got to choose a child. GJS
          templateUrl: 'views/common/mainLayout.html'
        })
        //Views
        .state('app.home', {
          url: '/home',
          templateUrl: 'views/home.html',
          controller: 'mainCtrl',
        })
        .state('app.cards', {
          url: '/cards',
          templateUrl: 'views/cards.html',
          controller: 'cardsCtrl',
        })
    }
  ]);
