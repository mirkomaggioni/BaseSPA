(function (window, angular) {
  'use-strict';
  angular.module('postsModule', ['ui.router', 'ODataResources', 'blogsModule', 'uiModule'])
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
    .factory('postsResource', function ($odataresource, $http) {
      var post = $odataresource('/odata/Posts', {}, {}, {
        odatakey: 'Id',
        isodatav4: true
      });

      angular.extend(post.prototype, {
        '$patch': function () {
          var req = {
            method: 'PATCH',
            url: '/odata/Posts(' + this.Id + ')',
            data: this
          };

          return $http(req);
        }
      });

      return post;
    })
    .controller('postsCtrl', function ($scope, $state, postsResource) {
        $scope.new = function () {
          $state.go("home.post", { id: null });
        };

        $scope.detail = function (id) {
          $state.go("home.post", { id: id });
        };

        $scope.Posts = postsResource.odata().query();
      })
    .controller('postsDetailCtrl', function ($scope, $state, $stateParams, postsResource, blogsResource) {
      var isNew = $state.params.id === '';

      var load = function (id) {
        $scope.Blogs = blogsResource.odata().query();
        if (isNew) {
          $scope.Post = new postsResource();
        } else {
          $scope.Post = postsResource.odata().get(id);
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