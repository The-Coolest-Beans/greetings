'use strict';

angular
  .module('app')
  .controller('appCtrl', ['$stateParams', '$scope',
    function AppCtrl($stateParams, $scope) {

      // set the page title
      $scope.pageTitle = "Cool Bean Cards";

      // listen for another view telling us what the web page title should be.
      $scope.$on('setPageTitle', function(event, data) {
        $scope.pageTitle = data;
      }); // end scope.on

    } // end AppCtrl function

  ]);
