'use strict';

angular
  .module('app')
  .controller('myCardsCtrl', ['$stateParams', '$scope', '$rootScope', '$http', 'authService', '$timeout', '$state',
    function($stateParams, $scope, $rootScope, $http, authService, $timeout, $state) {
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
        $scope.currentlySelectedSentCard = $scope.firstSentCard;
        $scope.currentlySelectedSentIndex = 0;

      }, function(e) {

        // error occurred - print it
        console.log('Get call to sent cards errored.', e);

      }); // end api call block

      $scope.lastSentClicked = function(){

        // update the current counter index
        if ($scope.currentlySelectedSentIndex <= 0) $scope.currentlySelectedSentIndex = $scope.sentCards.length;
        else $scope.currentlySelectedSentIndex--;

        // update the currently selected card
        if ($scope.currentlySelectedSentIndex == 0) $scope.currentlySelectedSentCard = $scope.firstSentCard;
        else $scope.currentlySelectedSentCard = $scope.sentCards[$scope.currentlySelectedSentIndex-1];

      } // end method

      $scope.nextSentClicked = function(){

        // update the current counter index
        if ($scope.currentlySelectedSentIndex >= $scope.sentCards.length) $scope.currentlySelectedSentIndex = 0;
        else $scope.currentlySelectedSentIndex++;

        // update the currently selected card
        if ($scope.currentlySelectedSentIndex == 0) $scope.currentlySelectedSentCard = $scope.firstSentCard;
        else $scope.currentlySelectedSentCard = $scope.sentCards[$scope.currentlySelectedSentIndex-1];

      } // end method

      // clear out the templates array
      $scope.receivedCards = [];

      // call the api to get the sent cards
      $http.get('/api/myCards/received').then(function(result){

        // save the results of the call
        $scope.receivedCards = result.data;
        $scope.firstReceivedCard = $scope.receivedCards[0];
        $scope.receivedCards.splice(0, 1);
        $scope.currentlySelectedReceivedCard = $scope.firstReceivedCard;
        $scope.currentlySelectedReceivedIndex = 0;

      }, function(e) {

        // error occurred - print it
        console.log('Get call to sent cards errored.', e);

      }); // end api call block

      $scope.lastReceivedClicked = function(){

        // update the current counter index
        if ($scope.currentlySelectedReceivedIndex <= 0) $scope.currentlySelectedReceivedIndex = $scope.receivedCards.length;
        else $scope.currentlySelectedReceivedIndex--;

        // update the currently selected card
        if ($scope.currentlySelectedReceivedIndex == 0) $scope.currentlySelectedReceivedCard = $scope.firstReceivedCard;
        else $scope.currentlySelectedReceivedCard = $scope.receivedCards[$scope.currentlySelectedReceivedIndex-1];

      } // end method

      $scope.nextReceivedClicked = function(){

        // update the current counter index
        if ($scope.currentlySelectedReceivedIndex >= $scope.receivedCards.length) $scope.currentlySelectedReceivedIndex = 0;
        else $scope.currentlySelectedReceivedIndex++;

        // update the currently selected card
        if ($scope.currentlySelectedReceivedIndex == 0) $scope.currentlySelectedReceivedCard = $scope.firstReceivedCard;
        else $scope.currentlySelectedReceivedCard = $scope.receivedCards[$scope.currentlySelectedReceivedIndex-1];

      } // end method

      $scope.extractEmailAddress = function(fromAddress){

        if(fromAddress == null) return "";

        var emailAddress = fromAddress.substring(fromAddress.lastIndexOf("<")+1, fromAddress.lastIndexOf(">"));
        return emailAddress;

      } // end method

      // method called when a card is delted from the mycards page
      $scope.deleteCard = function(index) {

        // find out which card needs to be deleted
        var cardToDelete;
        if (index == 0)
          cardToDelete = $scope.firstSentCard;
        else
          cardToDelete = $scope.sentCards[index-1];

        // actually call the API to delete the card
        $http.patch('/api/deleteCard', 'id=' + cardToDelete.cardId, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } } ).then( function(result){

          // reload the page
          $state.reload();

        }, function(e) {

          // error occurred - print it
          console.log('Patch call to delete cards errored.', e);

        }); // end api call block

      };

    } // end function

  ]); // end controller
