# Base SPA
Documentation

# App configuration

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
      config.MapHttpAttributeRoutes();
      config.Routes.MapHttpRoute(
        name: "DefaultApi",
        routeTemplate: "api/{controller}/{id}",
        defaults: new { id = RouteParameter.Optional }
      );

      appBuilder.UseWebApi(config);
    }
  }
  ```

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

# Web Api 2 Web services

https://docs.microsoft.com/en-us/aspnet/web-api/overview/getting-started-with-aspnet-web-api/tutorial-your-first-web-api  
https://docs.microsoft.com/en-us/aspnet/web-api/overview/getting-started-with-aspnet-web-api/action-results  
https://it.wikipedia.org/wiki/JavaScript_Object_Notation  
https://docs.microsoft.com/en-us/aspnet/web-api/overview/web-api-routing-and-actions/routing-in-aspnet-web-api  
https://docs.microsoft.com/en-us/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-2  

* Add a new web api Blogs, start the project and check with a client like postman the url api/blogs
* Add a new web api Posts, with two get with an id as parameter, the first one is to get all post of a blog, the second one is
to get a single post
* Add a route attribute to GetBlogPosts action

# OData

http://www.odata.org/  
https://docs.microsoft.com/en-us/aspnet/web-api/overview/odata-support-in-aspnet-web-api/odata-v4/create-an-odata-v4-endpoint  

* Install these mandatory packages
  ```
  Install-Package Microsoft.AspNet.Odata
  ```
* Add the configuration in Startup.cs file (after web api section)

  ``` cs
  var builder = new ODataConventionModelBuilder();
  builder.EntitySet<Blog>("Blogs");
  builder.EntitySet<Post>("Posts");
  config.Count().Filter().OrderBy().Expand().Select().MaxTop(null);
  config.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
  ```

## Controllers creation

* Create Blogs ODataController and Posts ODataController, remove useless ApiController
* Add the route configuration in Startup.cs file; the configuration is specified in the ODataController if it was created with scaffolding
* With postman check some calls like these:

## Tests with Postman

* /odata/$metadata
* /odata/Blogs
* /odata/Blogs(cad6651d-7a2c-434b-883b-cbd3ab5d57c8)
* /odata/Posts
* /odata/Posts(cad6651d-7a2c-434b-883b-cbd3ab5d57c3)?$expand=Blog
* /odata/Posts(cad6651d-7a2c-434b-883b-cbd3ab5d57c3)?$expand=Blog&$select=Title,Content,Blog/Url

## Research material

https://docs.microsoft.com/en-us/aspnet/web-api/overview/odata-support-in-aspnet-web-api/odata-v4/entity-relations-in-odata-v4  
https://docs.microsoft.com/en-us/aspnet/web-api/overview/odata-support-in-aspnet-web-api/odata-v4/odata-actions-and-functions  

# Dependency Injection with Autofac

http://autofac.readthedocs.io/en/latest/getting-started/index.html  
http://autofac.readthedocs.io/en/latest/register/registration.html  
http://autofac.readthedocs.io/en/latest/configuration/modules.html  

* Install these mandatory packages
  ```
  Install-Package Autofac.WebApi2.Owin
  ```
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

# Api Documentation with Swagger/Swashbuckle

https://swagger.io/
https://github.com/domaindrivendev/Swashbuckle

* Install these mandatory packages
  ```
  Install-Package Swashbuckle.Core
  ```
* Add the configuration in Startup.cs file
  ``` cs
  config
    .EnableSwagger(c => c.SingleApiVersion("v1", "BaseSPA"))
    .EnableSwaggerUi();
  ```
* Fix conflits on same routes with route attribute

# Oauth token authentication

http://blogs.perficient.com/delivery/blog/2017/06/11/token-based-authentication-in-web-api-2-via-owin/

* Install these mandatory packages
  ```
  Install-Package Microsoft.Owin.Security.OAuth
  ```
* Add the configuration in Startup.cs file
  ``` cs
  var oAuthServerOptions = new OAuthAuthorizationServerOptions()
  {
    AllowInsecureHttp = true,
    TokenEndpointPath = new PathString("/token"),
    AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(60),
    Provider = new SimpleAuthorizationServerProvider()
  };
  // Token Generation
  app.UseOAuthAuthorizationServer(oAuthServerOptions);
  app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
  ```
* Implementing SimpleAuthorizationServerProvider class
  ``` cs
  public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
  {
    public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
    {
      context.Validated();
      return Task.CompletedTask;
    }

    public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
    {

      context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
      if (context.UserName != "User" || context.Password != "Password")
      {
        context.SetError("invalid_grant", "The user name or password is incorrect.");
        return Task.CompletedTask;
      }
      var identity = new ClaimsIdentity(context.Options.AuthenticationType);
      identity.AddClaim(new Claim("sub", context.UserName));
      identity.AddClaim(new Claim("role", "user"));
      context.Validated(identity);
      return Task.CompletedTask;
    }
  }
  ```
* Decore controller or action with [Authorize] attribute

## Tests with Postman
* authorized controller without token authentication
* /token (post x-www-form-urlencoded) grant_type:password, username:User, password:Password
* authorized controller with bearer token

# HTML, CSS, Bootstrap

## HTML

https://www.w3schools.com/html/html5_intro.asp  
https://www.w3schools.com/html/html_basic.asp  
https://www.w3schools.com/html/html_attributes.asp  
https://www.w3schools.com/html/html_links.asp  
https://www.w3schools.com/html/html_images.asp  
https://www.w3schools.com/html/html_tables.asp  
https://www.w3schools.com/html/html_lists.asp  
https://www.w3schools.com/html/html_blocks.asp  

* Add index.html file

## CSS

https://www.w3schools.com/html/html_styles.asp  
https://www.w3schools.com/html/html_formatting.asp  
https://www.w3schools.com/html/html_css.asp  
https://www.w3schools.com/html/html_classes.asp  

## Bootstrap

http://getbootstrap.com/getting-started/  
https://getbootstrap.com/docs/3.3/components/#labels  
https://getbootstrap.com/docs/3.3/components/#navbar  
https://getbootstrap.com/docs/3.3/components/#nav  
https://getbootstrap.com/docs/3.3/components/#panels  
https://getbootstrap.com/docs/3.3/css/#tables  
https://getbootstrap.com/docs/3.3/css/#forms  
https://getbootstrap.com/docs/3.3/components/#badges  

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

https://www.w3schools.com/html/html_forms.asp  
https://www.w3schools.com/html/html_form_elements.asp  
https://www.w3schools.com/html/html_form_input_types.asp  
https://www.w3schools.com/html/html_form_attributes.asp  

# Client packages

https://nodejs.org/en/  
https://www.npmjs.com/  
https://bower.io/  

## Node/NPM

Install nodejs  
Install bower:  
``` cmd
npm install -g bower  
```

## Bower

Install bootstrap and font-awesome:  
``` cmd
bower install bootstrap --save  
bower install components-font-awesome --save  
```

Replace references in index.html  

# Angular

https://angularjs.org/  

## Configuration

Install bower packages:  
``` cmd
bower install angular --save  
bower install angular-filter --save  
bower install angular-ui-router --save  
```

## Application bootstrap

https://docs.angularjs.org/guide/bootstrap  
http://www.codestyle.co/Guidelines/angularjs  
https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Strict_mode  

Add app.js file like this:  

``` javascript
(function(window, angular) {
  'use-strict';
  angular.module('app', [])
  .controller('mainController', ['$scope', function($scope) {
      $scope.Title = 'TEST';
    }]);
})(window, window.angular);
```

## Controllers

https://docs.angularjs.org/guide/di  
https://docs.angularjs.org/guide/controller  

App module refactoring, removing array annotation  

https://docs.angularjs.org/guide/module  

## UI Router

https://ui-router.github.io/ng1/tutorial/helloworld  
https://github.com/angular-ui/ui-router/wiki  

We have defined a default main state named 'main'  
Add mainModule.js:  

``` javascript
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
```

Refactoring app.js:  

``` javascript
(function(window, angular) {
  angular.module('app', ['ui.router', 'mainModule'])
  .run(function($state) {
    $state.go('hello');
   });
})(window, window.angular)
```

We have defined the properties of the state and the controller  

* Add the html page of the state
* Create a new page header.html and mode the header
* Move the menù and the content in main.html page
* Change the main module like this:

``` javascript
(function(window, angular) {
  'use-strict';
  angular.module('mainModule', ['ui.router', 'blogsModule', 'postsModule'])
    .config(function ($stateProvider) {
        var mainState = {
          name: 'home',
          url: '/home',
          views: {
            'header': { templateUrl: 'app/main/header.html' },
            'main': { templateUrl: 'app/main/main.html', controller: 'mainCtrl' }
          }
        }

        $stateProvider.state(mainState);
      })
    .controller('mainCtrl', function ($scope, $state) {
        $scope.$state = $state;
      });
})(window, window.angular)
```

https://ui-router.github.io/ng1/tutorial/hellogalaxy  

* Add blogsModule and postsModule with html templates, change mainModule

``` javascript
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
```

## Factories

https://docs.angularjs.org/guide/services  
https://docs.angularjs.org/api/ng/directive/ngRepeat  

* Add in blogs.html table a bootstrap table
* Add factory in blogs module
* Add interator in blogs.html page
* Add blog.html page

https://ui-router.github.io/ng1/tutorial/hellosolarsystem#state-parameters  

* Add home.blog state configuration and controller

## Blog CRUD Operations

* Add list, detail, create, methods to blogService
* Add save, delete methods to blogService

## Post CRUD Operations

https://docs.angularjs.org/api/ng/directive/select  

* Add list, detail, create, methods to postService
* Add blogModule dependency to postModule, in order to load the blogs list
* Add post.html page
* Add save, delete methods to postService
* Fix patch method in ODataController with this row:

## Filters

https://docs.angularjs.org/guide/filter  

* Add search field on top of blogs.html and posts.html
* Add filter in ng-repeat of the pages

## Directives

https://docs.angularjs.org/guide/directive  

* Add uiSelect directive

## Research material

https://docs.angularjs.org/guide/providers  
