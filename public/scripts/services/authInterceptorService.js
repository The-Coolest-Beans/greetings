'use strict';
console.log("testing, authInterceptorService js file loading...");
/**
 * @ngdoc service
 * @name hbirdApp.authInterceptorService
 * @description
 * # authInterceptorService
 * Factory in the hbirdApp.
 */
angular.module('app')
.factory('authInterceptorService', ['$q', '$location', '$injector', '$window', 'localStorageService',
function ($q, $location, $injector, $window, localStorageService) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {
        config.headers = config.headers || {};
        //TODO: You should pull the token from localstorage, where you put it when they logged in.
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers['x-access-token'] = authData.token;
        }
        //config.headers['x-access-token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiR3JlZyIsInBhc3N3b3JkIjoicHdkMTIzNCIsImlhdCI6MTQ1NTMwNTQ3NCwiZXhwIjoxNDU1MzkxODc0fQ.U8ke0oFBbnFoZxGCccu2ZaJP_qBfLTJ6_VpQ88s4ifs';

        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
          //TODO: have the user login again, since their token was rejected.
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);
