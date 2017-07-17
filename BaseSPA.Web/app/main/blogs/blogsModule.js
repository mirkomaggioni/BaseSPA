(function (window, angular) {
  'use-strict';
  angular.module('blogsModule', ['ui.router'])
    .config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider
          .state('home.blogs',
          {
            url: '/blogs',
            templateUrl: 'app/main/blogs/blogs.html',
            controller: 'blogsCtrl'
          })
          .state('home.blog',
          {
            url: '/blog/:id',
            templateUrl: 'app/main/blogs/blog.html',
            controller: 'blogsDetailCtrl'
          });
      }
    ])
    .factory('blogsService', ['$http', function ($http) {
      return {
        list: function () {
          return $http.get("/odata/Blogs");
        },
        detail: function (id) {
          return $http.get("/odata/Blogs(guid'" + id + "')");
        }
      }
    }])
    .controller('blogsCtrl', ['$scope', '$state', 'blogsService', function ($scope, $state, blogsService) {

      $scope.detail = function(id) {
        $state.go("home.blog", { id: id });
      }

      blogsService.list().then(function (result) {
        $scope.Blogs = result.data.value;
      });
    }])
    .controller('blogsDetailCtrl', ['$scope', '$state', '$stateParams', 'blogsService', function ($scope, $state, $stateParams, blogsService) {

      $scope.close = function() {
        $state.go("home.blogs");
      }

      blogsService.detail($stateParams.id).then(function (result) {
        $scope.Blog = result.data;
      });
    }]);
})(window, window.angular);