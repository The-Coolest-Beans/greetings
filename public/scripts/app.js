'use strict';

/**
 * @ngdoc overview
 * @name hbirdApp
 * @description
 * # hbirdApp
 *
 * Main module of the application.
 */
angular
  .module('app', [
    'ui.router',
  ])
  .config(['$httpProvider', function ($httpProvider) {

     $httpProvider.interceptors.push('authInterceptorService');
  }]);
