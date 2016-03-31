'use strict';

angular
  .module('app')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {

      // For unmatched routes
      $urlRouterProvider.otherwise('/home');

      //Set default routes for empty child route.
      $urlRouterProvider.when('/{coId:int}/Template', '/{coId:int}/template/list');
      $urlRouterProvider.when('/{coId:int}/template/', '/{coId:int}/template/list');

      // Application routes
      $stateProvider
        .state('app', {
          abstract: true, //Means you can't pick this route directly, got to choose a child. GJS
          templateUrl: 'views/common/mainLayout.html',
          controller: 'layoutCtrl',
        })
        //Views
        .state('app.home', {
          url: '/home',
          templateUrl: 'views/home.html',
          controller: 'homeCtrl',
        })
        .state('app.cards', {
          url: '/cards',
          templateUrl: 'views/cards.html',
          controller: 'cardsCtrl',
        })
        .state('app.login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'sessionCtrl',
        })
        .state('app.signUp', {
          url: '/signup',
          templateUrl: 'views/signUp.html',
          controller: 'signUpCtrl',
        })
        .state('app.cardCustomization', {
          //url: '/customize',
          templateUrl: 'views/cardCustomization.html',
          //controller: 'signUpCtrl',
        })
    }
  ]);
