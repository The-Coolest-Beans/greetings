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
    'LocalStorageModule',
    'textAngular',
  ])
  .config(['$httpProvider', function ($httpProvider) {
     $httpProvider.interceptors.push('authInterceptorService');
  }])
  .constant('ENV', {URLBASE:'http://greetings.cs.nmsu.edu:3000/#/'})

;
