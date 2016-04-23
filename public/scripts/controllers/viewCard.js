'use strict';

angular
  .module('app')
  .controller('viewCardCtrl', ['$stateParams', '$scope', '$rootScope', '$http', 'authService', '$timeout', '$state',
    function AppCtrl($stateParams, $scope, $rootScope, $http, authService, $timeout, $state) {


      $scope.logout = function() {
        console.log('Logging out.');
        authService.logOut();
      };

      //TODO: Have data here to view the card.

    } // end function

  ]); // end controller
