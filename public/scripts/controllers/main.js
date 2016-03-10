'use strict';

angular
  .module('app')
  .controller('mainCtrl', ['$stateParams', '$scope', '$rootScope',
    function AppCtrl($stateParams, $scope, $rootScope) {
      console.log("starting mainCtrl...");
      $scope.sometext = 'Bob Newhart';

      $rootScope.$broadcast('setPageTitle', 'Main');

      $scope.goClicked = function(){
        console.log("go got clicked...", $scope.sometext);
      };
    }
  ]);
