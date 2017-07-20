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
        },
        create: function (blog) {
          var req = {
            method: 'POST',
            url: '/odata/Blogs',
            headers: {
              'Content-Type': 'application/json'
            },
            data: blog
          };

          return $http(req);
        },
        save: function (blog) {
          var req = {
            method: 'PATCH',
            url: '/odata/Blogs(guid\'' + blog.Id + '\')',
            headers: {
              'Content-Type': 'application/json'
            },
            data: blog
          };

          return $http(req);
        },
        delete: function (id) {
          return $http.delete("/odata/Blogs(guid'" + id + "')");
        }
      }
    }])
    .controller('blogsCtrl', ['$scope', '$state', 'blogsService', function ($scope, $state, blogsService) {

      $scope.new = function() {
        $state.go("home.blog", { id: null });
      };

      $scope.detail = function(id) {
        $state.go("home.blog", { id: id });
      };

      blogsService.list().then(function (result) {
        $scope.Blogs = result.data.value;
      });
    }])
    .controller('blogsDetailCtrl', ['$scope', '$state', '$stateParams', 'blogsService', function ($scope, $state, $stateParams, blogsService) {

      $scope.save = function () {
        if ($scope.Blog.Id === undefined) {
          blogsService.create($scope.Blog).then(function (result) {
            $scope.Blog = result.data;
          });
        } else {
          blogsService.save($scope.Blog).then(function () {});
        };
      };

      $scope.delete = function() {
        blogsService.delete($scope.Blog.Id).then(function() {
          $state.go("home.blogs");
        });
      }

      $scope.close = function () {
        $state.go("home.blogs");
      };

      if ($stateParams.id == '') {
        $scope.Blog = { Name: '', Url: '' }  
      } else {
        blogsService.detail($stateParams.id).then(function (result) {
          $scope.Blog = result.data;
        });  
      }
    }]);
})(window, window.angular);