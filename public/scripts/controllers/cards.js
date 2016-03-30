'use strict';

angular
  .module('app')
  .controller('cardsCtrl', ['$stateParams', '$scope', '$rootScope', '$http',
    function AppCtrl($stateParams, $scope, $rootScope, $http) {

      // set the page title
      $rootScope.$broadcast('setPageTitle', 'Cards');

      // clear out the templates array
      $scope.templates = [];

      // call the templates api
      $http.get('/api/templates').then(function(result){

        // save the results of the call
        $scope.templates = result.data;

      }, function(e) {

        // error occurred - print it
        console.log('Get call to templates errored.', e);

      }); // end api call block

    } // end function

  ]); // end controller
