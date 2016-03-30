'use strict';

angular
  .module('app')
  .controller('cardsCtrl', ['$stateParams', '$scope', '$rootScope', '$http', 'authService', '$timeout', '$state',
    function AppCtrl($stateParams, $scope, $rootScope, $http, authService, $timeout, $state) {

      // set the page title
      $rootScope.$broadcast('setPageTitle', 'Cards');

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
          $state.go('app.home');
        });
      });
      //If the user isn't logged in, send them back to the home page.
      if(!$scope.user || !$scope.user.name) {
        console.log('User isn\'t authenticated. Go back to home.');
        $state.go('app.home');
      }

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
