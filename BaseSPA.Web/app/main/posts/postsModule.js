(function (window, angular) {
  'use-strict';
  angular.module('postsModule', ['ui.router', 'ODataResources', 'blogsModule', 'uiModule', 'odataResourcesModule'])
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
    .factory('postsService', function ($odataresource, $http, odataGenericResource) {
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
      var isNew = $state.params.id === '';

      var load = function (id) {
        $scope.Blogs = blogsService.getOdataResource().query();
        if (isNew) {
          $scope.Post = postsService.create();
        } else {
          $scope.Post = postsService.getOdataResource().get(id);
        }
      };

      $scope.save = function () {
        if (isNew) {
          $scope.Post.$save(function (data) {
            isNew = false;
            load(data.Id);
          });
        } else {
          $scope.Post.$patch();
        }
      };

      $scope.delete = function () {
        $scope.Post.$delete(function () {
          $scope.close();
        });
      }

      $scope.close = function () {
        $state.go("home.posts");
      };

      load($state.params.id);
    });
})(window, window.angular);