'use strict';

angular
  .module('app')
  .controller('appCtrl', ['$stateParams', '$scope',
    function AppCtrl($stateParams, $scope) {
      console.log("starting AppCtrl...");
      $scope.pageTitle = "New App";

      //Listen for another view telling us what the web page title should be.
      $scope.$on('setPageTitle', function(event, data) {
        console.log('setPageTitle:',data); // 'Data to send'
        $scope.pageTitle = data;
      });
    }
  ]);
