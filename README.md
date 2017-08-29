# Base SPA
Documentation

# App configuration

## Model Project creation

* Create a Class Library Project (.NET Framework 4.6.1) 
* Install these mandatory packages
  ```
  Install-Package EntityFramework
  ```
* Create Models directory and add models classes (Blog, Post)
* Create Context class (Context)
* Enable Migrations and create Initial migration
  ```
  Enable-Migrations
  Add-Migration InitialCreate
  ```

## Web Project creation

https://docs.microsoft.com/en-us/aspnet/web-api/overview/hosting-aspnet-web-api/use-owin-to-self-host-web-api

* Create an ASP.NET Web Application (.NET Framework 4.6.1) with Empty template
* Install these mandatory packages
  ```
  Install-Package Microsoft.AspNet.WebApi.OwinSelfHost
  Install-Package Microsoft.Owin.Host.SystemWeb
  ```
* Add Startup.cs file
  ``` cs
  public class Startup
  {
    public void Configuration(IAppBuilder appBuilder)
    {
      // Configure Web API for self-host. 
      HttpConfiguration config = new HttpConfiguration();
      config.Routes.MapHttpRoute(
        name: "DefaultApi",
        routeTemplate: "api/{controller}/{id}",
        defaults: new { id = RouteParameter.Optional }
      );

      appBuilder.UseWebApi(config);
    }
  }
  ```


# Web Api 2 Web services

https://docs.microsoft.com/en-us/aspnet/web-api/overview/getting-started-with-aspnet-web-api/tutorial-your-first-web-api<br/>
https://docs.microsoft.com/en-us/aspnet/web-api/overview/getting-started-with-aspnet-web-api/action-results<br/>
https://it.wikipedia.org/wiki/JavaScript_Object_Notation<br/>
https://docs.microsoft.com/en-us/aspnet/web-api/overview/web-api-routing-and-actions/routing-in-aspnet-web-api<br/>
https://docs.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-2<br/>

* Add a new web api Blogs, start the project and check with a client like postman the url api/blogs
* Add a new web api Posts, with two get with an id as parameter, the first one is to get all post of a blog, the second one is
to get a single post
* Add a route attribute to GetBlogPosts action

# OData

http://www.odata.org/<br/>
https://docs.microsoft.com/en-us/aspnet/web-api/overview/odata-support-in-aspnet-web-api/odata-v4/create-an-odata-v4-endpoint<br/>

## Controllers creation

* Create Blogs ODataController and Posts ODataController, remove useless ApiController
* Add the route configuration in Startup.cs file; the configuration is specified in the ODataController if it was created with scaffolding
* With postman check some calls like these:

## Tests with Postman

* /odata/$metadata
* /odata/Blogs
* /odata/Blogs(guid'cad6651d-7a2c-434b-883b-cbd3ab5d57c8')
* /odata/Posts
* /odata/Posts(guid'cad6651d-7a2c-434b-883b-cbd3ab5d57c3')?$expand=Blog
* /odata/Posts(guid'cad6651d-7a2c-434b-883b-cbd3ab5d57c3')?$expand=Blog&$select=Title,Content,Blog/Url

## Research material

https://docs.microsoft.com/en-us/aspnet/web-api/overview/odata-support-in-aspnet-web-api/odata-v4/entity-relations-in-odata-v4<br/>
https://docs.microsoft.com/en-us/aspnet/web-api/overview/odata-support-in-aspnet-web-api/odata-v4/odata-actions-and-functions<br/>

# Dependency Injection with Autofac

http://autofac.readthedocs.io/en/latest/getting-started/index.html<br/>
http://autofac.readthedocs.io/en/latest/register/registration.html<br/>
http://autofac.readthedocs.io/en/latest/configuration/modules.html<br/>

* Install Autofac, Autofac.WebApi2
* Change ContextFactory as non static class
* Add ModuloCore.cs
* Add the configuration in Startup.cs file

  ``` cs
  var containerBuilder = new ContainerBuilder();
  containerBuilder.RegisterModule(new ModuloCore());
  containerBuilder.RegisterApiControllers(Assembly.GetExecutingAssembly());
  var container = containerBuilder.Build();

  var config = new HttpConfiguration
  {
    DependencyResolver = new AutofacWebApiDependencyResolver(container)
  };
  ```

# HTML, CSS, Bootstrap

## HTML

https://www.w3schools.com/html/html5_intro.asp<br/>
https://www.w3schools.com/html/html_basic.asp<br/>
https://www.w3schools.com/html/html_attributes.asp<br/>
https://www.w3schools.com/html/html_links.asp<br/>
https://www.w3schools.com/html/html_images.asp<br/>
https://www.w3schools.com/html/html_tables.asp<br/>
https://www.w3schools.com/html/html_lists.asp<br/>
https://www.w3schools.com/html/html_blocks.asp<br/>

* Add index.html file

## CSS

https://www.w3schools.com/html/html_styles.asp<br/>
https://www.w3schools.com/html/html_formatting.asp<br/>
https://www.w3schools.com/html/html_css.asp<br/>
https://www.w3schools.com/html/html_classes.asp<br/>

## Bootstrap

http://getbootstrap.com/getting-started/<br/>
https://getbootstrap.com/docs/3.3/components/#labels<br/>
https://getbootstrap.com/docs/3.3/components/#navbar<br/>
https://getbootstrap.com/docs/3.3/components/#nav<br/>
https://getbootstrap.com/docs/3.3/components/#panels<br/>
https://getbootstrap.com/docs/3.3/css/#tables<br/>
https://getbootstrap.com/docs/3.3/css/#forms<br/>
https://getbootstrap.com/docs/3.3/components/#badges<br/>

* Add bootstrap.min.css file, add a basic navbar
* Change navbar layout with custom css class
* Add bootstrap Nav Pills
* Set custom css class for Nav Pills:

``` html
<ul>
<li>
font color: .nav.nav-pills.nav-stacked li a
</li>
<li>
background hover color: .nav.nav-pills.nav-stacked li a:hover
</li>
</ul>
```

* Set bootstrap columns
* Add font awesome cdn ref:
<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>

## Research material

https://www.w3schools.com/html/html_forms.asp<br/>
https://www.w3schools.com/html/html_form_elements.asp<br/>
https://www.w3schools.com/html/html_form_input_types.asp<br/>
https://www.w3schools.com/html/html_form_attributes.asp<br/>

# Client packages

https://nodejs.org/en/<br/>
https://www.npmjs.com/<br/>
https://bower.io/<br/>

## Node/NPM

Install nodejs<br/>
Install bower:<br/>
npm install -g bower<br/>

## Bower

Install bootstrap and font-awesome<br/>
Replace references in index.html<br/>

# Angular

https://angularjs.org/

## Configuration

Install bower packages:<br/><br/>
angular<br/>
angular-filter<br/>
angular-ui-router<br/><br/>

## Application bootstrap

https://docs.angularjs.org/guide/bootstrap

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

## Controllers

https://docs.angularjs.org/guide/di<br/>
https://docs.angularjs.org/guide/controller<br/>

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

<br/><br/>We have defined the properties of the state and the controller<br/>
Add the html page of the state.<br/>

## UI Router

https://github.com/angular-ui/ui-router/wiki/URL-Routing<br/>
https://ui-router.github.io/ng1/tutorial/helloworld<br/>

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

## Factories

https://docs.angularjs.org/guide/services<br/>

Add in blogs.html table a bootstrap table
Add factory in blogs module
Add interator in blogs.html page
Add blog.html page
Add home.blog state configuration and controller

## Blog CRUD Operations

Add list, detail, create, methods to blogService
Add save, delete methods to blogService
Fix patch method in ODataController with this row:

_db.Entry(blog).State = EntityState.Modified;

## Post CRUD Operations

Add list, detail, create, methods to postService
Add blogModule dependency to postModule, in order to load the blogs list
Add post.html page
Add save, delete methods to postService
Fix patch method in ODataController with this row:

_db.Entry(blog).State = EntityState.Modified;


## Filters

https://docs.angularjs.org/guide/filter<br/>

Add search field on top of blogs.html and posts.html
Add filter in ng-repeat of the pages

## Directives

https://docs.angularjs.org/guide/directive<br/>

Add uiSelect directive