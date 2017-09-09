(function (window, angular) {
  'use-strict';
  angular.module('blogsModule', ['ui.router', 'ODataResources'])
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
    .factory('blogsResource', function ($odataresource, $http) {
      var blog = $odataresource('/odata/Blogs', {}, {}, {
        odatakey: 'Id',
        isodatav4: true
      });

      angular.extend(blog.prototype, {'$patch': function() {
        var req = {
          method: 'PATCH',
          url: '/odata/Blogs(' + this.Id + ')',
          data: this
        };

        return $http(req);
      }});

      return blog;
    })
    .controller('blogsCtrl', function ($scope, $state, blogsResource) {

      $scope.new = function() {
        $state.go("home.blog", { id: null });
      };

      $scope.detail = function(id) {
        $state.go("home.blog", { id: id });
      };

      $scope.Blogs = blogsResource.odata().query();
    })
    .controller('blogsDetailCtrl', function ($scope, $state, blogsResource) {
      var isNew = $state.params.id === '';

      var load = function (id) {
        if (isNew) {
          $scope.Blog = new blogsResource();
        } else {
          $scope.Blog = blogsResource.odata().get(id);
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