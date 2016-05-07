'use strict';

angular
  .module('app')
  .controller('adminCtrl', ['$stateParams', '$scope', '$rootScope', '$http', 'authService', '$timeout', '$state', '$location',
    function AppCtrl($stateParams, $scope, $rootScope, $http, authService, $timeout, $state, $location) {

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
      //If the user isn't logged in or isn't an admin, send them back to the home page.
      if(!$scope.user || !$scope.user.name || !$scope.user.adminTF) {
        console.log('User isn\'t authenticated. Go back to home.');
        $state.go('app.home');
      }
      $scope.logout = function() {
        console.log('Logging out.');
        authService.logOut();
      };

      $http.get('/api/admin/allUsers').then(function(result) {
        if(!result.data || result.status != 200)
        {
          console.log('Failed to get users. Error: ', result);
        }
        else {
          $scope.users = result.data;
        }
      }, function(e) {
        console.log('Get call to users errored.', e);
      }); // end api call block

      $scope.sortType = "loggedIn"; // User field in table to order by
      $scope.sortReverse = true;  // Reverse order table column

      // Ban a user given their user ID
      $scope.banUser = function(userId, userName){
        $http.patch('/api/users/banAccount/' + userId).then(function(result) {
          console.log('User has been banned.', result);
          noty({
            timeout: 3000,
            type: 'confirm', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: 'User ' + userName + ' has been banned.',
            closeWith: ['button', 'click'],
          }); // end noty block
        }, function(e) {
          // error occurred - print it
          console.log('Error banning user.', e);
        });
      }

      // Unban a user given their user ID
      $scope.unbanUser = function(userId, userName){
        $http.patch('/api/users/unbanAccount/' + userId).then(function(result) {
          console.log('User has been unbanned.', result);
          noty({
            timeout: 3000,
            type: 'confirm', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: 'User ' + userName + ' has been unbanned.',
            closeWith: ['button', 'click'],
          }); // end noty block
        }, function(e) {
          // error occurred - print it
          console.log('Error unbanning user.', e);
        });
      }

      // Verfiy a user given their user ID
      $scope.verifyUser = function(userId, userName){
        $http.get('/api/verifyUser/' + userId).then(function(result) {
          console.log('User has been verified.', result);
          noty({
            timeout: 3000,
            type: 'confirm', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: 'User ' + userName + ' has been verified.',
            closeWith: ['button', 'click'],
          }); // end noty block
        }, function(e) {
          // error occurred - print it
          console.log('Error verifying user.', e);
        });
      }

      // Verfiy a user given their user ID
      $scope.viewUserProfile = function(userId){
        $state.go('app.home');
      }

      $scope.showUsersTF = true;
      $scope.showCardsTF = false;

      $scope.showUsers = function() {
        console.log('showUsers');
        $scope.showUsersTF = true;
        $scope.showCardsTF = false;
      };

      $scope.showCards = function() {
        console.log('showCards');
        $scope.showUsersTF = false;
        $scope.showCardsTF = true;
      };

      $scope.cardsSortType = "toAddress"; // User field in table to order by
      $scope.cardsSortReverse = true;  // Reverse order table column

      $http.get('/api/admin/getAllSent').then(function(result) {

        if(!result.data || result.status != 200)
          console.log('Failed to all sent cards. Error: ', result);

        else
          $scope.allCards = result.data;

      }, function(e) {

        console.log('Get call to getAllSent errored.', e);

      }); // end api call block

      $scope.extractEmailAddress = function(fromAddress){

        if(fromAddress == null) return "";

        var emailAddress = fromAddress.substring(fromAddress.lastIndexOf("<")+1, fromAddress.lastIndexOf(">"));
        return emailAddress;

      } // end method

      $scope.loadViewCard = function(cardId) {
        $location.path('/viewCard/' + cardId);
      }; // end method

    } // end function

  ]); // end controller
