(function (window, angular) {
  'use-strict';
  angular.module('postsModule', ['ui.router'])
    .config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider.state('home.posts',
          {
            url: '/posts',
            templateUrl: 'app/main/posts/posts.html',
            controller: 'postsCtrl'
          });
      }
    ])
    .controller('postsCtrl', [
      '$scope', function ($scope) {
        $scope.Titolo = "POSTS";
      }
    ]);
})(window, window.angular);