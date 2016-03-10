'use strict';

angular
  .module('app')
  .controller('dogsCtrl', ['$stateParams', '$scope', '$rootScope', '$http',
    function AppCtrl($stateParams, $scope, $rootScope, $http) {
      console.log("starting dogsCtrl...");
      $rootScope.$broadcast('setPageTitle', 'Dogs');

      $scope.dogs = [];

      $http.get('/api/dogs')
      .then(function(result){
        console.log('get call to dogs successful.', result);
        $scope.dogs = result.data;
      }, function(e){
        console.log('get call to dogs errored.', e);
      });

    }
  ]);
