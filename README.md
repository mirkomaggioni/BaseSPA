# Base SPA
Documentation

# Web Api 2 Web services

Remove Global.asax file<br/>
Remove Application Insights files if presents<br/>
Remove files in App_start folder except FilterConfig.cs<br/>
Add Startup.cs file<br/>
Set HttpConfiguration in Startup.cs<br/>
Install these mandatory packages:<br/>

Microsoft.AspNet.WebApi.OwinSelfHost<br/>
Microsoft.AspNet.WebApi.Owin<br/>
Microsoft.Owin.Hosting<br/>
Microsoft.Owin.Host.SystemWeb<br/>

Add a new web api Blogs, start the project and check with a client like postman the url api/blogs<br/>

Add a new web api Posts, with two get with an id as parameter, the first one is to get all post of a blog, the second one is
to get a single post<br/>
Add a route attribute to GetBlogPosts action<br/>

# OData

Create Blogs ODataController and Posts ODataController, remove useless ApiController<br/>
Add the route configuration in Startup.cs file; the configuration is specified in the ODataController if it was created with scaffolding<br/>
With postman check some calls like these:<br/>

/odata/$metadata<br/>
/odata/Blogs<br/>
/odata/Blogs(guid'cad6651d-7a2c-434b-883b-cbd3ab5d57c8')<br/>
/odata/Posts<br/>
/odata/Posts(guid'cad6651d-7a2c-434b-883b-cbd3ab5d57c3')?$expand=Blog<br/>
/odata/Posts(guid'cad6651d-7a2c-434b-883b-cbd3ab5d57c3')?$expand=Blog&$select=Title,Content,Blog/Url<br/>

# Dependency Injection

Install Autofac, Autofac.WebApi2<br/>
Change ContextFactory as non static class<br/>
Add ModuloCore.cs<br/>
Add the configuration in Startup.cs file<br/>

var containerBuilder = new ContainerBuilder();<br/>
containerBuilder.RegisterModule(new ModuloCore());<br/>
containerBuilder.RegisterApiControllers(Assembly.GetExecutingAssembly());<br/>
var container = containerBuilder.Build();<br/>

var config = new HttpConfiguration<br/>
{<br/>
    DependencyResolver = new AutofacWebApiDependencyResolver(container)<br/>
};<br/>

# HTML, CSS, Bootstrap

Add index.html file<br/>
Add bootstrap.min.css file, add a basic navbar<br/>
Change navbar layout with custom css class<br/>
Add bootstrap Nav Pills<br/>
Set custom css class for Nav Pills:<br/>
<ul>
<li>
font color: .nav.nav-pills.nav-stacked li a
</li>
<li>
background hover color: .nav.nav-pills.nav-stacked li a:hover
</li>
</ul>
Set bootstrap columns
Add font awesome cdn ref:<br/><br/>
<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>

# Bower

Install nodejs<br/>
Install bower:<br/>
npm install -g bower<br/>
Install bootstrap and font-awesome<br/>
Replace references in index.html<br/>

#Angular

Install bower packages:<br/><br/>
angular<br/>
angular-filter<br/>
angular-ui-router<br/><br/>

Add app.js file like this:<br/><br/>

(function(window, angular) {
  'use-strict';
  angular.module('app', ['ui.router', 'angular.filter', 'mainModule'])
    .config(['$urlRouterProvider', function($urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
    }])
    .run(['$state', function ($state) {
      $state.go('main');
    }]);
})(window, window.angular);

<br/><br/>
We have defined a default main state named 'main'<br/>
Add mainModule.js:<br/><br/>

(function(window, angular) {
  'use-strict';
  angular.module('mainModule', ['ui.router'])
    .config([
      '$stateProvider', function($stateProvider) {
        $stateProvider.state('main',
          {
            url: '/main',
            templateUrl: 'app/main/main.html',
            controller: 'mainCtrl'
          });
      }
    ])
    .controller('mainCtrl', [
      '$scope', function($scope) {
        $scope.Titolo = "homepage";
      }
    ]);
})(window, window.angular);

<br/><br/>Add mainModule.js:<br/><br/>

(function(window, angular) {
  'use-strict';
  angular.module('mainModule', ['ui.router'])
    .config([
      '$stateProvider', function($stateProvider) {
        $stateProvider.state('main',
          {
            url: '/main',
            templateUrl: 'app/main/main.html',
            controller: 'mainCtrl'
          });
      }
    ])
    .controller('mainCtrl', [
      '$scope', function($scope) {
        $scope.Titolo = "homepage";
      }
    ]);
})(window, window.angular);

<br/><br/>We have defined the properties of the state and the controller<br/>
Add the html page of the state.<br/>

#Angular UI Router

Create a new page header.html and mode the header<br/>
Move the menù and the content in main.html page<br/>
Change the main module like this:<br/><br/>
(function(window, angular) {
  'use-strict';
  angular.module('mainModule', ['ui.router'])
    .config([
      '$stateProvider', function($stateProvider) {
        $stateProvider.state('home',
          {
            url: '',
            views: {
              'header': { templateUrl: 'app/main/header.html' },
              'main': { templateUrl: 'app/main/main.html', controller: 'mainCtrl' }
            }
          });
      }
    ])
    .controller('mainCtrl', [
      '$scope', function($scope) {
        $scope.Titolo = "homepage";
      }
    ]);
})(window, window.angular);
<br/><br/>Remove state.go from the app.js page<br/><br/>
Add blogsModule and postsModule with html templates, change mainModule<br/><br/>
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
    .controller('blogsCtrl', [
      '$scope', function ($scope) {
        $scope.Titolo = "BLOGS";
      }
    ]);
})(window, window.angular);
<br/><br/>

#Angular Factories

Add in blogs.html table a bootstrap table
Add factory in blogs module
Add interator in blogs.html page
Add blog.html page
Add home.blog state configuration and controller

#Blog CRUD Operations

Add list, detail, create, methods to blogService
Add save, delete methods to blogService
Fix patch method in ODataController with this row:

_db.Entry(blog).State = EntityState.Modified;








