'use strict';

angular.module('app')
  .controller('sessionCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$http', 'authService',
    function($scope, $rootScope, $state, $stateParams, $http, authService) {
      console.log('sessionCtrl is starting...');

      //Start LOGIN related items.
      $scope.credentials = {};
      $scope.msg = "";
      $scope.signin = function() {
        $state.go('app.login');
      };

      //Login Submit
      $scope.login = function() {
        // noty({
        //   timeout: 5000,
        //   type: 'information', //blue. Also alert, information, confirm, error, warning
        //   layout: 'topCenter',
        //   text: 'Not Set',
        //   closeWith: ['button', 'click'],
        // });

        console.log('login clicked.', $scope.credentials);

        if (!$scope.credentials || !$scope.credentials.userName || $scope.credentials.userName.length <= 0
          || !$scope.credentials.password || $scope.credentials.password.length <= 0)
        {
          noty({
            timeout: 3000,
            type: 'error', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: 'Please enter a username and password.',
            closeWith: ['button', 'click'],
          });
          $scope.loading = false;
          return;
        }

        authService.login($scope.credentials).then(function(user) {
          $scope.loading = false;
          $rootScope.$broadcast('auth-success');
          //$scope.setCurrentUser(user);
          $state.go('app.home');
        }, function() {
          $scope.loading = false;
          $rootScope.$broadcast('auth-fail');

          noty({
            timeout: 3000,
            type: 'error', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: 'Invalid username or password. Please try again.',
            closeWith: ['button', 'click'],
          });
        });
      };
      //END LOGIN related items:

      //Start ForgotPassword related items:
      $scope.forgotPwd = {};
      $scope.sendForgotPwd = function() {
        console.log('Send Forgot Password Reset button Clicked.', $scope.forgotPwd);
        console.log('$scope.f3.$valid', $scope.f3.$valid);
        if (!$scope.f3.$valid) {
          var c = jQuery.extend(true, {}, $scope.notyError1Config);
          c.text = 'Please fill out your email.';
          noty(c);
          $scope.f3loading = false;
          return; //don't continue.
        };
        $http.get(ENV.SERVICE_BASE + 'api/Account/ForgotPassword?siteName=admin&email=' + $scope.forgotPwd.email)
          .success(function(response) {
            $scope.f3loading = false;
            console.log('Success from ForgotPassword api', response);
            var c = jQuery.extend(true, {}, $scope.notyConfig);
            c.text = "If your email is in the system, you should receive instructions on resetting your password at that email in a few minutes.";
            noty(c);
            $state.go('app.home');
          }).error(function(err, status) {
            $scope.f3loading = false;
            console.log('Error from sendForgotPwd, error', err);
            console.log('Error from sendForgotPwd, error', status);
            var c = jQuery.extend(true, {}, $scope.notyError1Config);
            c.text = 'Error trying to change password.<br>' + err.Message;
            noty(c);
          });
      };

      //End ForgotPassword related items:
      //Start ResetPassword related items:
      $scope.resetData = {};
      $scope.resetPwd = function() {
        console.log('reset button Clicked.', $scope.resetData);
        console.log('$scope.freset.$valid', $scope.freset.$valid);
        if (!$scope.freset.$valid) {
          var c = jQuery.extend(true, {}, $scope.notyError1Config);
          c.text = 'Please fill out new password twice.';
          noty(c);
          $scope.fresetLoading = false;
          return; //don't continue.
        };
        if ($scope.resetData.NewPassword != $scope.resetData.ConfirmPassword) {
          console.log('Password not the same.');
          $.noty.closeAll();
          var c = jQuery.extend(true, {}, $scope.notyError1Config);
          c.text = 'The passwords you typed do not match. Please retry.';
          noty(c);
          $scope.fresetLoading = false;
          return;
        };
        $scope.resetData.userID = $stateParams.userID;
        $scope.resetData.token = $stateParams.token;

        console.log("Submitting resetData to resetPassword api, $scope.resetData", $scope.resetData);

        $http.post(ENV.SERVICE_BASE + 'api/Account/ResetPassword', $scope.resetData)
          .success(function(response) {
            $scope.fresetLoading = false;
            console.log('Success from ResetPassword api', response);
            var c = jQuery.extend(true, {}, $scope.notyConfig);
            c.text = "Your new password has been set";
            noty(c);
            $state.go('app.home');
          }).error(function(err, status) {
            $scope.fresetLoading = false;
            console.log('Error from ResetPassword, error', err);
            console.log('Error from ResetPassword, error', status);
            var c = jQuery.extend(true, {}, $scope.notyError1Config);
            c.text = 'Error trying to change password.<br>' + err.Message;
            noty(c);
          });

      };
      //End ResetPassword related items:


    } //controller function
  ]); //controller
