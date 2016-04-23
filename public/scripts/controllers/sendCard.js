'use strict';

angular
  .module('app')
  .controller('sendCardCtrl', ['$stateParams', '$scope', '$rootScope', '$http', 'authService', '$timeout', '$state',
    function AppCtrl($stateParams, $scope, $rootScope, $http, authService, $timeout, $state) {
      console.log('sendCardCtrl called...');

      //This is set to handle new logins and already loaded users.
      $scope.user = authService.getUser();
      $scope.token = authService.getToken();
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

      //$scope.card = {};
      $scope.cardID = $stateParams.cardID;
      console.log('cardID: ', $scope.cardID);

      //get the card information
      $http.get('/api/mycards/' + $scope.cardID).then(function(result){
        console.log('mycards call result:', result);
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

      // $scope.createCard = function() {
      //
      //   var customizePageUUID = generateUUID();
      //
      //   $http.post('/api/createCard', {
      //     id: customizePageUUID,
      //     templateId: $scope.cardInfo.id, //This will link to the background image in the cardTemplate table
      //     headerText: $scope.customizeTextInput,
      //     headerTextColor: $scope.selectedColor,
      //     bodyText: "",
      //     bodyTextColor: "Black",
      //     ownerId: $scope.user.id, // This is the GUID of the user who is creating the card
      //     fontFamily: $scope.selectedFontFamily,
      //     token: $scope.token
      //   }).success(function(result) {
      //
      //     //Let the user know that the card was created.
      //     noty({
      //       timeout: 3000,
      //       type: 'confirm', //blue. Also alert, information, confirm, error, warning
      //       layout: 'topCenter',
      //       text: 'Card created.',
      //       closeWith: ['button', 'click'],
      //     }); // end noty block
      //
      //     $state.go('app.viewCard', {'cardID': customizePageUUID});
      //
      //   }, function(e) {
      //     // error occurred - print it
      //     console.log('Post to create card errored.', e);
      //   });
      // };

    } // end function

  ]); // end controller
