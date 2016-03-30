'use strict';

angular
  .module('app')
  .controller('layoutCtrl', ['$stateParams', '$scope', '$rootScope', '$http', 'authService', '$timeout',
    function($stateParams, $scope, $rootScope, $http, authService, $timeout) {
      console.log('Starting layoutCtrl...');

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

    } // end fucntion

  ]); // end controller
