'use strict';

angular
  .module('app')
  .controller('page2Ctrl', ['$stateParams', '$scope', '$rootScope',
    function AppCtrl($stateParams, $scope, $rootScope) {
      console.log("starting page2Ctrl...");
      $rootScope.$broadcast('setPageTitle', 'Page2');

    }
  ]);
