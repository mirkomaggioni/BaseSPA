(function (window, angular) {
  'use-strict';
  angular.module('blogsModule', ['ui.router', 'odataResourcesModule'])
    .config(function ($stateProvider) {
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
      })
    .factory('blogsService', function ($http, odataGenericResource) {
      return new odataGenericResource('odata', 'Blogs', 'Id');
    })
    .controller('blogsCtrl', function ($scope, $state, blogsService) {

      $scope.new = function() {
        $state.go("home.blog", { id: null });
      };

      $scope.detail = function(id) {
        $state.go("home.blog", { id: id });
      };

      $scope.Blogs = blogsService.getOdataResource().query();
    })
    .controller('blogsDetailCtrl', function ($scope, $state, blogsService) {
      var load = function (id) {
        blogsService.get(id).then(function(data) {
          $scope.Blog = data;
        });
      };

      $scope.save = function () {
        blogsService.save($scope.Blog).then(function(data) {
          load(data.Id);
        });
      }

      $scope.delete = function () {
        blogsService.delete($scope.Blog).then(function () {
          $scope.close();
        });
      };

      $scope.close = function () {
        $state.go("home.blogs");
      };

      load($state.params.id);
    });
})(window, window.angular);
