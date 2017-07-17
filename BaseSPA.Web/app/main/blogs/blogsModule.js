(function (window, angular) {
  'use-strict';
  angular.module('blogsModule', ['ui.router'])
    .config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider.state('home.blogs',
          {
            url: '/blogs',
            templateUrl: 'app/main/blogs/blogs.html',
            controller: 'blogsCtrl'
          });
      }
    ])
    .factory('blogsService', ['$http', function($http) {
      return {
        lista: function() {
          return $http.get("/odata/Blogs");
        }
      }
    }])
    .controller('blogsCtrl', ['$scope', 'blogsService', function ($scope, blogsService) {
        blogsService.lista().then(function(result) {
          $scope.Blogs = result.data.value;
        });
      }
    ]);
})(window, window.angular);