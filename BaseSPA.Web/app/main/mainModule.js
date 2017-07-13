(function(window, angular) {
  'use-strict';
  angular.module('mainModule', ['ui.router'])
    .config([
      '$stateProvider', function($stateProvider) {
        $stateProvider.state('main',
          {
            url: '/main',
            templateUrl: 'app/main/main.html',
            controller: 'mainCtrl'
          });
      }
    ])
    .controller('mainCtrl', [
      '$scope', function($scope) {
        $scope.Titolo = "homepage";
      }
    ]);
})(window, window.angular);