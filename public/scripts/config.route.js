'use strict';

var generateUUID = function() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

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
        .state('app.myCards', {
          url: '/myCards',
          templateUrl: 'views/myCards.html',
          controller: 'myCardsCtrl',
        })
        .state('app.cards', {
          url: '/cards/:themeId',
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
        .state('app.forgotPassword', {
          url: '/forgotPassword',
          templateUrl: 'views/forgotPassword.html',
          controller: 'forgotPasswordCtrl',
        })
        .state('app.verifyUser', {
          url: '/verifyUser/:userID',
          templateUrl: 'views/verifyUser.html',
          controller: 'verifyUserCtrl',
        })
        .state('app.cardCustomization', {
          url: '/customize/:cardID',
          templateUrl: 'views/cardCustomization.html',
          controller: 'cardCustomizationCtrl',
        })
        .state('app.sendCard', {
          url: '/sendCard/:cardID',
          templateUrl: 'views/sendCard.html',
          controller: 'sendCardCtrl',
        })
        .state('app.account', {
          url: '/account',
          templateUrl: 'views/account.html',
          controller: 'accountCtrl',
        })
        .state('app.admin', {
          url: '/admin/',
          templateUrl: 'views/admin.html',
          controller: 'adminCtrl',
        })
        .state('app.adminProfile', {
          url: '/admin/userProfile/:userID',
          templateUrl: 'views/adminProfile.html',
          controller: 'adminProfileCtrl',
        })
        .state('app.viewCard', {
          url: '/viewCard/:cardID',
          templateUrl: 'views/viewCard.html',
          controller: 'viewCardCtrl',
        })
    }
  ]);
