'use strict';

angular
  .module('app')
  .controller('viewCardCtrl', ['$stateParams', '$scope', '$rootScope', '$http', 'authService', '$timeout', '$state',
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

      $scope.cardID = $stateParams.cardID;
      console.log('cardID: ', $scope.cardID);

      //get the card information
      $http.get('/api/viewcard/' + $scope.cardID).then(function(result){
        console.log('viewcard call result:', result);
        if(!result.data || result.status != 200)
        {
          console.log('Failed to get card. Error: ', result);
        }
        else {
          $scope.card = result.data;
          console.log('Card data: ', $scope.card);
          $scope.customStyle = {"color":$scope.card.headerTextColor, "font-family":$scope.card.fontFamily};

          // get the template information
          $http.get('/api/templates/' + $scope.card.templateId).then(function(result){
            $scope.template = result.data[0];
            console.log('Template data: ', $scope.template);
          }, function(e) {
            console.log('Get call to templates errored.', e);
          }); // end api call block

        }
      }, function(e) {

        //If the user is an admin, try to load it with the admin call (ignores deletedDT).
        if($scope.user && $scope.user.adminTF) {
          console.log('User is admin, try again.');
          $http.get('/api/admin/getSingleSent/' + $scope.cardID).then(function(result){
            console.log('getSingleSent call result:', result);
            if(!result.data || result.status != 200)
            {
              console.log('Failed to get card. Error: ', result);
            }
            else {
              $scope.card = result.data;
              console.log('Card data: ', $scope.card);
              $scope.customStyle = {"color":$scope.card.headerTextColor, "font-family":$scope.card.fontFamily};

              // get the template information
              $http.get('/api/templates/' + $scope.card.templateId).then(function(result){
                $scope.template = result.data[0];
                console.log('Template data: ', $scope.template);
              }, function(e) {
                console.log('Get call to templates errored.', e);
              }); // end api call block

            }
          }, function(e) {
            console.log('Get call to getSingleSent errored.', e);
            noty({
              timeout: 3000,
              type: 'error', //blue. Also alert, information, confirm, error, warning
              layout: 'topCenter',
              text: e.message,
              closeWith: ['button', 'click'],
            }); // end noty block
          }); // end api call block
        }
        else {
          console.log('Get call to cards errored.', e);
          noty({
            timeout: 3000,
            type: 'error', //blue. Also alert, information, confirm, error, warning
            layout: 'topCenter',
            text: 'This card cannot be accessed. It is possible that it has been deleted.',
            closeWith: ['button', 'click'],
          }); // end noty block
        }
      }); // end api call block

    } // end function

  ]); // end controller
