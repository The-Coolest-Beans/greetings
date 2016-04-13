'use strict';

angular
  .module('app')
  .controller('cardCustomizationCtrl', ['$stateParams', '$scope', '$rootScope', '$http', 'authService', '$timeout', '$state',
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

      $scope.logout = function() {
        console.log('Logging out.');
        authService.logOut();
      };

      // clear out the templates dictionary
      $scope.cardInfo = {};
      var requestPath = "/api/templates/" + $stateParams.cardID;

      // call the templates api
      $http.get(requestPath).then(function(result){

        // save the results of the call
        $scope.cardInfo = result.data[0];
        $scope.customizeTextInput = $scope.cardInfo.defaultHeaderText;

      }, function(e) {

        // error occurred - print it
        console.log('Get call to templates errored.', e);

      }); // end api call block

      $scope.customStyle = {};

      //
      // Change color of text
      //
      $scope.colors = ["red", "green", "blue", "black", "white", "brown", "yellow", "purple", "pink", "orange", "gray"];

      $scope.changeColor = function(color){
        $scope.customStyle.style = {"color":color};
      } // end changeColor function

    } // end function

  ]); // end controller
