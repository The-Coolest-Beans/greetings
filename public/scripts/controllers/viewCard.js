'use strict';

angular
  .module('app')
  .controller('viewCardCtrl', ['$stateParams', '$scope', '$rootScope', '$http', 'authService', '$timeout', '$state',
    function AppCtrl($stateParams, $scope, $rootScope, $http, authService, $timeout, $state) {


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
        console.log('Get call to cards errored.', e);
      }); // end api call block

    } // end function

  ]); // end controller
