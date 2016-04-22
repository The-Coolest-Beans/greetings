'use strict';

/**
 * @ngdoc service
 * @name app.authService
 * @description
 * # authService
 * Factory in the app.
 */
angular.module('app')
  .factory('authService', ['$http', '$q', 'localStorageService', '$rootScope', '$state',
    function($http, $q, localStorageService, $rootScope, $state) {
      console.log('authService factory starting...');

      var authServiceBase = '/';
      var authServiceFactory = {};

      var _authentication = {
        isAuth: false,
        user: {}
      };

      var _saveRegistration = function(registration) {
        _logOut();
        return $http.post(authServiceBase + 'api/account/register', registration).then(function(response) {
          return response;
        });
      };

      var _login = function(loginData) {
        localStorageService.remove('authorizationData');

        var data = 'name=' + loginData.userName + '&password=' + loginData.password;
        var deferred = $q.defer();
        console.log('Calling login with data=' + data);

        $http.post(authServiceBase + 'auth', data, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .success(function(response) {
            console.log('login result: success: ', response);
            if(!response || !response.success) {
              //The response came back, but the data is bad.
              console.log('Login failed.');
              console.log('Response: ', response);
              _logOut();
              deferred.reject(response);
              return deferred.promise;
            }
            localStorageService.set('authorizationData', {
              token: response.token,
              user: response.user
            });
            _authentication.isAuth = true;
            _authentication.user = loginData.user;

            $rootScope.$broadcast('UserAuthenticated', _authentication.user);

            deferred.resolve(response);
          }).error(function(err, status) {
            console.log('Login result: error');
            console.log(err);
            console.log(status);
            _logOut();
            deferred.reject(err);
          });

        return deferred.promise;
      };

      var _logOut = function() {
        localStorageService.remove('authorizationData');
        _authentication.isAuth = false;
        _authentication.user = {};
        console.log('logging out and redirecting to login.');
        $rootScope.$broadcast('UserLogOut');
        $state.go('app.login');
      };

      var _fillAuthData = function() {
        console.log('fillAuthData called.');
        var authData = localStorageService.get('authorizationData');
        console.log("fillAuthData() authData:" ,authData);
        if (authData) {
          _authentication.isAuth = true;
          _authentication.token = authData.token;
          _authentication.user = authData.user;
          console.log("user:" + _authentication.user);
          //$rootScope.$broadcast('UserAuthenticated', _authentication.user);
        } else {
          //make sure we set auth to false so the route doesnt do anything
          console.log('authorizationData is null');
          _authentication.isAuth = false;
        }
        return _authentication;
      };

      var _isAuthenticated = function() {
        _fillAuthData();
        return _authentication.isAuth;
      };

      var _getUserName = function() {
        _fillAuthData();
        return _authentication.user.name;
      }

      var _getUser = function() {
        console.log('getUser called.');
        _fillAuthData();
        return _authentication.user;
      }

      var _getToken = function() {
        console.log('getToken called.');
        _fillAuthData();
        return _authentication.token;
      }

      authServiceFactory.saveRegistration = _saveRegistration;
      authServiceFactory.login = _login;
      authServiceFactory.logOut = _logOut;
      authServiceFactory.fillAuthData = _fillAuthData;
      authServiceFactory.authentication = _authentication;
      authServiceFactory.isAuthenticated = _isAuthenticated;
      authServiceFactory.getUserName = _getUserName;
      authServiceFactory.getUser = _getUser;
      authServiceFactory.getToken = _getToken;

      authServiceFactory.fillAuthData(); //Fill authdata now if available. GJS
      //console.log("2) isAuth:" + _authentication.isAuth);

      return authServiceFactory;

    }
  ]);
