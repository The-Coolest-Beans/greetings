'use strict';

angular
  .module('app')
  .controller('cardsCtrl', ['$stateParams', '$scope', '$rootScope', '$http',
    function AppCtrl($stateParams, $scope, $rootScope, $http) {

      // set the page title
      $rootScope.$broadcast('setPageTitle', 'Cards');

      // clear out the themes array
      $scope.themes = [];

      // call the themes api
      $http.get('/api/themes').then(function(result){

        // save the results of the call
        $scope.themes = result.data;

      }, function(e) {

        // error occurred - print it
        console.log('Get call to themes errored.', e);

      }); // end api call block

    } // end fucntion

  ]); // end controller
