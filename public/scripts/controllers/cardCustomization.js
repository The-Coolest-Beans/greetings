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

      // create a custom style for the card text
      $scope.customStyle = {};

      // Make list of web-safe colors
      $scope.colors = ["red", "green", "blue", "black", "white", "brown", "yellow", "purple", "pink", "orange", "gray"];
      $scope.selectedColor = "black";

      // change color function
      $scope.changeColor = function(color){

        // actually set the color of the text
        $scope.selectedColor = color;

      } // end changeColor function

      // list web-safe fonts
      $scope.fonts = [{
        "FontName": "Times New Roman",
        "FontFamily": "\"Times New Roman\", Times, serif"
      }, {
        "FontName": "Palatino Linotype",
        "FontFamily": "\"Palatino Linotype\", \"Book Antiqua\", Palatino, serif"
      }, {
        "FontName": "Georgia",
        "FontFamily": "Georgia, serif"
      }, {
        "FontName": "Verdana",
        "FontFamily": "Verdana, Geneva, sans-serif"
      }, {
        "FontName": "Trebuchet MS",
        "FontFamily": "\"Trebuchet MS\", Helvetica, sans-serif"
      }, {
        "FontName": "Tahoma",
        "FontFamily": "Tahoma, Geneva, sans-serif"
      }, {
        "FontName": "Lucida Sans Unicode",
        "FontFamily": "\"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif"
      }, {
        "FontName": "Impact",
        "FontFamily": "Impact, Charcoal, sans-serif"
      }, {
        "FontName": "Comic Sans MS",
        "FontFamily": "\"Comic Sans MS\", cursive, sans-serif"
      }, {
        "FontName": "Arial Black",
        "FontFamily": "\"Arial Black\", Gadget, sans-serif"
      }, {
        "FontName": "Arial",
        "FontFamily": "Arial, Helvetica, sans-serif"
      }, {
        "FontName": "Lucida Console",
        "FontFamily": "\"Lucida Console\", Monaco, monospace"
      }, {
        "FontName": "Courier New",
        "FontFamily": "\"Courier New\", Courier, monospace"
      }];
      $scope.selectedFontFamily = "\"Times New Roman\", Times, serif";

      // set up object to save all of the users data
      $scope.cardInfo = {};

      // change font function
      $scope.changeFont = function(font){

        // actually change the text font
        $scope.selectedFontName = font.FontName;
        $scope.selectedFontFamily = font.FontFamily;

      } // end changeColor function

      // update text function
      $scope.updateCardText = function(){

        // actually update the card text style
        $scope.customStyle.style = {"color":$scope.selectedColor, "font-family":$scope.selectedFontFamily};

      } // end update card text function

    } // end function

  ]); // end controller
