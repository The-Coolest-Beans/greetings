'use strict';

angular
  .module('app')
  .controller('adminCtrl', ['$stateParams', '$scope', '$rootScope', '$http', 'authService', '$timeout', '$state',
    function AppCtrl($stateParams, $scope, $rootScope, $http, authService, $timeout, $state) {

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

      $http.get('/api/users').then(function(result){
        console.log('user call result:', result);
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
      $scope.banUser = function(userId){
        $http.patch('/api/users/banAccount/' + userId).then(function(result) {
          console.log('User has been banned.', result);
        }, function(e) {
          // error occurred - print it
          console.log('Error banning user.', e);
        });
      }

      // Unban a user given their user ID
      $scope.unbanUser = function(userId){
        $http.patch('/api/users/unbanAccount/' + userId).then(function(result) {
          console.log('User has been unbanned.', result);
        }, function(e) {
          // error occurred - print it
          console.log('Error unbanning user.', e);
        });
      }

    } // end function

    //TODO Code to bring back users and cards

  ]); // end controller
