'use strict';

angular
  .module('app')
  .controller('adminProfileCtrl', ['$stateParams', '$scope', '$rootScope', '$http', 'authService', '$timeout', '$state',
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
      if(!$scope.user || !$scope.user.name || !$scope.user.adminTF) {
        console.log('User isn\'t authenticated. Go back to home.');
        $state.go('app.home');
      }


      $http.get('/api/admin/' + $stateParams.userID).then(function(result) {
        $scope.userData = result.data;
        $scope.newName = $scope.userData.name;
        $scope.newEmail = $scope.userData.email;
        $scope.newEmailRetype = $scope.newEmail;
        console.log("UserData: " + $scope.userData);
      });

      $scope.emailChangedTF = false;

      $scope.updateAccountInfo = function(){
        console.log("Account Info:\nName: " + $scope.newName + "\nEmail: " + $scope.newEmail);

        console.log('userEmail: ', $scope.userData.email);
        console.log('newEmail: ', $scope.newEmail);

        if($scope.userData.email != $scope.newEmail) {
          $scope.emailChangedTF = true;
        } else {
          $scope.emailChangedTF = false;
        }

        console.log('Email changed? ', $scope.emailChangedTF);

        if($scope.newEmail != $scope.newEmailRetype) {
          noty({
            timeout: 3000,
            type: 'error', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: 'The Email fields don\'t match.',
            closeWith: ['button', 'click'],
          }); // end noty block
          return;
        }

        if($scope.userData.name == $scope.newName && !$scope.emailChangedTF) {
          noty({
            timeout: 3000,
            type: 'confirm', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: 'No changes were made.',
            closeWith: ['button', 'click'],
          }); // end noty block
          return;
        }

        $http.patch('/api/users/updateUser', {
          userID: $scope.userData.id,
          name: $scope.newName, // This is the GUID of the user who is creating the card
          email: $scope.newEmail,
          emailChangedTF: $scope.emailChangedTF
        }).success(function(result) {

          console.log('Result: ', result);

          if(result.success)
          {
            //notify the user with some visual feedback
            noty({
              timeout: 3000,
              type: 'confirm', //blue. Also alert, information, confirm, error, warning
              layout: 'topCenter',
              text: result.message,
              closeWith: ['button', 'click'],
            }); // end noty block

          }
          else {
            //notify the user with some visual feedback
            noty({
              timeout: 3000,
              type: 'error', //blue. Also alert, information, confirm, error, warning
              layout: 'topCenter',
              text: result.message,
              closeWith: ['button', 'click'],
            }); // end noty block
          }

        }, function(e) {
          // error occurred - print it
          console.log('Post to create card errored.', e);
          return;
        });

      }; // end update account function

      $scope.deactivateAccount = function() {
        console.log('Deactivate the account for ' + $scope.userData.email);

        $http.delete('/api/users/deactivateAccount/' + $scope.userData.id).success(function(result) {
          console.log('Result: ', result);

          if(result.success)
          {
            //notify the user with some visual feedback
            noty({
              timeout: 3000,
              type: 'confirm', //blue. Also alert, information, confirm, error, warning
              layout: 'topCenter',
              text: result.message,
              closeWith: ['button', 'click'],
            }); // end noty block

          }
          else {
            //notify the user with some visual feedback
            noty({
              timeout: 3000,
              type: 'error', //blue. Also alert, information, confirm, error, warning
              layout: 'topCenter',
              text: result.message,
              closeWith: ['button', 'click'],
            }); // end noty block
          }

        }, function(e) {
          // error occurred - print it
          console.log('Post to create card errored.', e);
          return;
        });

      }; //end of deactiate account function

      $scope.resetPassword = function() {
        console.log('Reset password called.');

        if(!$scope.oldPassword) {
          noty({
            timeout: 3000,
            type: 'error', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: 'Fill in your current password.',
            closeWith: ['button', 'click'],
          }); // end noty block
          return;
        }

        if($scope.newPassword != $scope.retypeNewPassword) {
          noty({
            timeout: 3000,
            type: 'error', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: 'New password fields don\'t match.',
            closeWith: ['button', 'click'],
          }); // end noty block
          return;
        }

        $http.post('/api/users/resetPassword', {
          userID: $scope.userData.id,
          oldPassword: $scope.oldPassword,
          newPassword: $scope.newPassword
        }).success(function(result) {
          console.log('resetPassword result: ', result);

          if(result.success) {
            //notify the user with some visual feedback
            noty({
              timeout: 3000,
              type: 'confirm', //blue. Also alert, information, confirm, error, warning
              layout: 'topCenter',
              text: result.message,
              closeWith: ['button', 'click'],
            }); // end noty block
          } else {
            //notify the user with some visual feedback
            noty({
              timeout: 3000,
              type: 'error', //blue. Also alert, information, confirm, error, warning
              layout: 'topCenter',
              text: result.message,
              closeWith: ['button', 'click'],
            }); // end noty block
          }
        }); //end of get call

      }; //end resetPassword function

    } // end function
  ]); // end controller
