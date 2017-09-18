(function (window, angular) {
  'use-strict';
  angular.module('postsModule', ['ui.router', 'blogsModule', 'uiModule', 'odataResourcesModule'])
    .config([
      '$stateProvider', function ($stateProvider) {
        $stateProvider.state('home.posts',
          {
            url: '/posts',
            templateUrl: 'app/main/posts/posts.html',
            controller: 'postsCtrl'
          })
          .state('home.post',
            {
              url: '/post/:id',
              templateUrl: 'app/main/posts/post.html',
              controller: 'postsDetailCtrl'
            });
      }
    ])
    .factory('postsService', function ($http, odataGenericResource) {
      return new odataGenericResource('odata', 'Posts', 'Id');
    })
    .controller('postsCtrl', function ($scope, $state, postsService) {
        $scope.new = function () {
          $state.go("home.post", { id: null });
        };

        $scope.detail = function (id) {
          $state.go("home.post", { id: id });
        };

        $scope.Posts = postsService.getOdataResource().query();
      })
    .controller('postsDetailCtrl', function ($scope, $state, $stateParams, postsService, blogsService) {
      var load = function (id) {
        $scope.Blogs = blogsService.getOdataResource().query();

        postsService.get(id).then(function (data) {
          $scope.Post = data;
        });
      };

      $scope.save = function () {
        postsService.save($scope.Post).then(function (data) {
          load(data.Id);
        });
      };

      $scope.delete = function () {
        blogsService.delete($scope.Post).then(function () {
          $scope.close();
        });
      }

      $scope.close = function () {
        $state.go("home.posts");
      };

      load($state.params.id);
    });
})(window, window.angular);