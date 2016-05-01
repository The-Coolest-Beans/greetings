'use strict';

angular
  .module('app')
  .controller('myCardsCtrl', ['$stateParams', '$scope', '$rootScope', '$http', 'authService', '$timeout',
    function($stateParams, $scope, $rootScope, $http, authService, $timeout) {
      console.log('Starting myCardsCtrl...');

      //This is set to handle new logins and already loaded users.
      $scope.user = authService.getUser();
      $scope.$on('UserAuthenticated', function() {
        $timeout(function() {
          $scope.user = authService.getUser();
          console.log('Heard UserAuthenticated in layoutCtrl', $scope.user);
        });
      });
      $scope.$on('UserLogOut', function() {
        $timeout(function() {
          $scope.user = authService.getUser();
          console.log('Heard UserLogOut in layoutCtrl', $scope.user);
        });
      });

      $scope.logout = function() {
        console.log('Logging out.');
        authService.logOut();
      };

      // clear out the templates array
      $scope.sentCards = [];

      // call the api to get the sent cards
      $http.get('/api/myCards/sent').then(function(result){

        // save the results of the call
        $scope.sentCards = result.data;
        $scope.firstSentCard = $scope.sentCards[0];
        $scope.sentCards.splice(0, 1);

      }, function(e) {

        // error occurred - print it
        console.log('Get call to sent cards errored.', e);

      }); // end api call block

      // clear out the templates array
      $scope.receivedCards = [];

      // call the api to get the sent cards
      $http.get('/api/myCards/received').then(function(result){

        // save the results of the call
        $scope.receivedCards = result.data;
        $scope.firstReceivedCard = $scope.receivedCards[0];
        $scope.receivedCards.splice(0, 1);

      }, function(e) {

        // error occurred - print it
        console.log('Get call to sent cards errored.', e);

      }); // end api call block

    } // end function

  ]); // end controller
