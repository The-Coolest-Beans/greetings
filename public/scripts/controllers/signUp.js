'use strict';

angular.module('app')
  .controller('signUpCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$http', 'authService',
    function($scope, $rootScope, $state, $stateParams, $http, authService) {

      // Create variables for use later
      $scope.newUserInfo = {};

      // Sign Up Function
      $scope.signUpButtonClicked = function() {

        console.log('Sign up clicked:\nName:', $scope.newUserInfo.name, "\nEmail: ", $scope.newUserInfo.email, "\nConfirm Email: ", $scope.newUserInfo.confirmEmail, "\nPassword: ", $scope.newUserInfo.password, "\nConfirm Password: ", $scope.newUserInfo.confirmPassword);

        // Validate the name field
        if(!$scope.newUserInfo.name) {

          return;

        } // end if

        if ($scope.newUserInfo.name.length <= 0) {

          noty({
            timeout: 3000,
            type: 'error', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: 'Please enter a valid name',
            closeWith: ['button', 'click'],
          }); // end noty block

          $scope.loading = false;
          return;
        } // end if

        // Validate the email fields
        if(!$scope.newUserInfo.email || !$scope.newUserInfo.confirmEmail) {

          return;

        } //end if

        if ($scope.newUserInfo.email != $scope.newUserInfo.confirmEmail) {

          noty({
            timeout: 3000,
            type: 'error', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: 'Email addresses don\'t match',
            closeWith: ['button', 'click'],
          }); // end noty block

          $scope.loading = false;
          return;
        } // end if

        // Validate the password fields
        if (!$scope.newUserInfo.password || !$scope.newUserInfo.confirmPassword) {

          return;

        } // end if

        if ($scope.newUserInfo.password != $scope.newUserInfo.confirmPassword) {

          noty({
            timeout: 3000,
            type: 'error', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: 'Passwords don\'t match',
            closeWith: ['button', 'click'],
          }); // end noty block

          $scope.loading = false;
          return;

        } // end if

        if ($scope.newUserInfo.password.length <= 5) {

          noty({
            timeout: 3000,
            type: 'error', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: 'Password must be at least 6 characters long',
            closeWith: ['button', 'click'],
          }); // end noty block

          $scope.loading = false;
          return;

        } // end if

        console.log("Creating Account!");

        //All the information is good, try to send verification email
        console.log('Sending user info: ', $scope.newUserInfo);
        $http.post('/sendAuthEmail', $scope.newUserInfo).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log('result: ', response);

          //Let the user know that the email was sent.
          noty({
            timeout: 3000,
            type: 'confirm', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: response.message,//'Verification Email sent. Please check your email (' + $scope.newUserInfo.email + ')',
            closeWith: ['button', 'click'],
          }); // end noty block
          $state.go('app.login');
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log('error: ', response);
        });

      }; // end Sign Up function

    } // controller functio
  ]); // controller
