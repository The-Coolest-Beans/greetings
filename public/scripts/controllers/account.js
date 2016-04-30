'use strict';

angular
  .module('app')
  .controller('accountCtrl', ['$stateParams', '$scope', '$rootScope', '$http', 'authService', '$timeout', '$state',
    function AppCtrl($stateParams, $scope, $rootScope, $http, authService, $timeout, $state) {

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
        });
      });
      //If the user isn't logged in, send them back to the home page.
      if(!$scope.user || !$scope.user.name) {
        console.log('User isn\'t authenticated. Go back to home.');
        $state.go('app.home');
      }
      $scope.logout = function() {
        console.log('Logging out.');
        authService.logOut();
      };

      console.log($scope.user);

      //$scope.cards = [];
      // Get user's cards
      // $http.get('/api/myCards').then(function(result){
      //
      //   // save the results of the call
      //   $scope.cards = result.data;
      //   console.log($scope.cards);
      //
      //   }, function(e) {
      //     // error occurred - print it
      //     console.log('Get call to templates errored.', e);
      // });

      $scope.updateAccountInfo = function(){
        console.log("Account Info:\nName: " + $scope.user.name + "\nEmail: " + $scope.user.email);

      }; // end function

      $scope.deactivateAccount = function() {
        console.log('Deactivate the account for ' + $scope.user.email);
      };

    } // end function

  ]); // end controller
