'use strict';

angular
  .module('app')
  .controller('cardsCtrl', ['$stateParams', '$scope', '$rootScope', '$http', 
    function AppCtrl($stateParams, $scope, $rootScope, $http) {
      console.log("starting page2Ctrl...");
      $rootScope.$broadcast('setPageTitle', 'Cards');
        
$scope.themes = [];
        
$http.get('/api/themes').then(function(result){
    
    console.log('get call to themes successful.', result);
    $scope.themes = result.data;
}, function(e){
    
    console.log('Get call to themes errored.', e);
    
});
    
    }
    
  ]);
