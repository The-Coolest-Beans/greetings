'use strict';

angular.module('app')
  .controller('forgotPasswordCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$http', 'authService',
    function($scope, $rootScope, $state, $stateParams, $http, authService) {

      console.log('forgotPasswordCtrl started.');
      $scope.passwordReset = function() {
        console.log('passwordReset function called.');

        if($scope.userEmail != $scope.confirmEmail) {
          noty({
            timeout: 3000,
            type: 'error', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: 'The emails don\'t match. Please make sure your email is entered correctly',
            closeWith: ['button', 'click'],
          });
          return;
        }

        $http.post('/api/updatePassword', { "userEmail" : $scope.userEmail}).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log('result: ', response);

          //Let the user know that the email was sent.
          noty({
            timeout: 3000,
            type: 'confirm', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: response.data.message,
            closeWith: ['button', 'click'],
          }); // end noty block
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log('error: ', response);
        });

      }; //end of passwordReset function

    } // controller functio
  ]); // controller
