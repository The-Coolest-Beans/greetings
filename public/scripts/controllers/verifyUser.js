'use strict';

angular
  .module('app')
  .controller('verifyUserCtrl', ['$stateParams', '$scope', '$rootScope', '$http', 'authService', '$timeout',
    function($stateParams, $scope, $rootScope, $http, authService, $timeout) {
      console.log('Starting verifyUserCtrl...');

      $scope.userID = $stateParams.userID;
      $scope.displayMsg = 'Trying to verify user. Please wait...';

      console.log('passed userID: ', $scope.userID);

      $http.get('/api/verifyUser/fetchUser/' + $scope.userID).then(function(result){
        // save the results of the call
        $scope.user = result.data;
        console.log('found user: ', $scope.user);
        if(!$scope.user || !$scope.user.name) {
          console.log('User couldn\'t be verified.');
          $scope.displayMsg = 'There is no user associated with this verification link. Please try again.';
          //$state.go('app.home');
        }
        else if($scope.user.verifiedTF) {
          console.log('User is already verfied.');
          $scope.displayMsg = 'This user is already verified. Please login with your email and password.';
        }
        else if (!$scope.user.verifiedTF) {
          console.log('Verfifying User.');

          $http.get('/api/verifyUser/' + $scope.userID).then(function(result) {
            console.log('user verification result: ', result);
            if(result.status == 200) {
              $scope.displayMsg = 'User verified. Please login with your email and password.';
            }
            else {
              $scope.displayMsg = 'User verification failed. Please try again. Error: ' + result.message;
            }
          });
        }//closing else if

      }, function(e) {
        // error occurred - print it
        console.log('Get call for a specific user errored. ', e);
      }); // end api call block

    } // end function

  ]); // end controller
