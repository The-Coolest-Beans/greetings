'use strict';

angular
  .module('app')
  .controller('cardCustomizationCtrl', ['$stateParams', '$scope', '$rootScope', '$http', 'authService', '$timeout', '$state',
    function AppCtrl($stateParams, $scope, $rootScope, $http, authService, $timeout, $state) {

      console.log("You clicked on a card!");

    } // end function

  ]); // end controller
