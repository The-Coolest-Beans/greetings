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
      $scope.templates = [];

      // call the templates api
      $http.get('/api/templates/popular').then(function(result){

        // save the results of the call
        $scope.templates = result.data;

      }, function(e) {

        // error occurred - print it
        console.log('Get call to templates errored.', e);

      }); // end api call block

    } // end function

  ]); // end controller
