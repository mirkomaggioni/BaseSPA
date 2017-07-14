(function(window, angular) {
  'use-strict';
  angular.module('mainModule', ['ui.router', 'blogsModule', 'postsModule'])
    .config([
      '$stateProvider', function($stateProvider) {
        $stateProvider.state('home',
          {
            url: '',
            views: {
              'header': { templateUrl: 'app/main/header.html' },
              'main': { templateUrl: 'app/main/main.html', controller: 'mainCtrl' }
            }
          });
      }
    ])
    .controller('mainCtrl', [
      '$scope', '$state', function($scope, $state) {
        $state.go('home.blogs');
      }
    ]);
})(window, window.angular);