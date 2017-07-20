(function (window, angular) {
  'use-strict';
  angular.module('postsModule', ['ui.router', 'blogsModule'])
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
    .factory('postsService', ['$http', function ($http) {
      return {
        list: function () {
          return $http.get("/odata/Posts");
        },
        detail: function (id) {
          return $http.get("/odata/Posts(guid'" + id + "')");
        },
        create: function (post) {
          var req = {
            method: 'POST',
            url: '/odata/Posts',
            headers: {
              'Content-Type': 'application/json'
            },
            data: post
          };

          return $http(req);
        },
        save: function (post) {
          var req = {
            method: 'PATCH',
            url: '/odata/Posts(guid\'' + post.Id + '\')',
            headers: {
              'Content-Type': 'application/json'
            },
            data: post
          };

          return $http(req);
        },
        delete: function (id) {
          return $http.delete("/odata/Posts(guid'" + id + "')");
        }
      }
    }])
    .controller('postsCtrl', ['$scope', '$state', 'postsService', function ($scope, $state, postsService) {
        $scope.new = function () {
          $state.go("home.post", { id: null });
        };

        $scope.detail = function (id) {
          $state.go("home.post", { id: id });
        };

        postsService.list().then(function (result) {
          $scope.Posts = result.data.value;
        });
      }
    ])
    .controller('postsDetailCtrl', ['$scope', '$state', '$stateParams', 'postsService', 'blogsService', function ($scope, $state, $stateParams, postsService, blogsService) {

      $scope.save = function () {
        if ($scope.Post.Id === undefined) {
          postsService.create($scope.Post).then(function (result) {
            $scope.Post = result.data;
          });
        } else {
          postsService.save($scope.Post).then(function () { });
        };
      };

      $scope.delete = function () {
        postsService.delete($scope.Post.Id).then(function () {
          $state.go("home.posts");
        });
      }

      $scope.close = function () {
        $state.go("home.posts");
      };

      blogsService.list().then(function (result) {
        $scope.Blogs = result.data.value;
      });

      if ($stateParams.id == '') {
        $scope.Post = { Title: '', Content: '' }
      } else {
        postsService.detail($stateParams.id).then(function (result) {
          $scope.Post = result.data;
        });
      }
    }]);
})(window, window.angular);