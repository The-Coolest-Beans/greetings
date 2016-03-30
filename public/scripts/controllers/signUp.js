'use strict';

angular.module('app')
  .controller('signUpCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$http', 'authService',
    function($scope, $rootScope, $state, $stateParams, $http, authService) {

      // Create variables for use later
      $scope.newUserInfo = {};

      // Sign Up Function
      $scope.signUpButtonClicked = function() {

        console.log('Sign up clicked:\nName:', $scope.newUserInfo.name, "\nEmail: ", $scope.newUserInfo.email, "\nConfirm Email: ", $scope.newUserInfo.confirmEmail, "\nUsername: ", $scope.newUserInfo.username, "\nPassword: ", $scope.newUserInfo.password, "\nConfirm Password: ", $scope.newUserInfo.confirmPassword);

        // Validate the name field
        if(!$scope.newUserInfo.name) {

          return;

        } // end if

        if ($scope.newUserInfo.name.length <= 4) {

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

        // Validate the username fields
        if (!$scope.newUserInfo.username) {

          return;

        } // end if

        if ($scope.newUserInfo.username.length <= 4) {

          noty({
            timeout: 3000,
            type: 'error', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: 'Username must be at least 5 characters long',
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

        // TODO - Delete this noty once sign up actually gets working
        noty({
          timeout: 3000,
          type: 'confirm', //blue. Also alert, information, confirm, error, warning
          layout: 'topCenter',
          text: 'Account created',
          closeWith: ['button', 'click'],
        }); // end noty block

      }; // end Sign Up function

    } // controller functio
  ]); // controller
