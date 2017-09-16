(function (window, angular) {
  'use-strict';
  angular.module('blogsModule', ['ui.router', 'ODataResources', 'odataResourcesModule'])
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
    .factory('blogsService', function ($odataresource, $http, odataGenericResource) {
      return new odataGenericResource('odata', 'Blogs', 'Id');
    })
    .controller('blogsCtrl', function ($scope, $state, blogsService) {

      $scope.new = function() {
        $state.go("home.blog", { id: null });
      };

      $scope.detail = function(id) {
        $state.go("home.blog", { id: id });
      };

      $scope.Blogs = blogsService.getOdataResource().odata().query();
    })
    .controller('blogsDetailCtrl', function ($scope, $state, blogsService) {
      var isNew = $state.params.id === '';

      var load = function (id) {
        if (isNew) {
          $scope.Blog = blogsService.create();
        } else {
          $scope.Blog = blogsService.getOdataResource().odata().get(id);
        }
      };

      $scope.save = function () {
        if (isNew) {
          $scope.Blog.$save(function(data) {
            isNew = false;
            load(data.Id);
          });
        } else {
          $scope.Blog.$patch();
        };
      };

      $scope.delete = function () {
        $scope.Blog.$delete(function () {
          $scope.close();
        });
      };

      $scope.close = function () {
        $state.go("home.blogs");
      };

      load($state.params.id);
    });
})(window, window.angular);
