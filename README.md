# Base SPA
Documentation

# Web Api 2 Web services

Remove Global.asax file
Remove Application Insights files if presents
Remove files in App_start folder except FilterConfig.cs
Add Startup.cs file
Set HttpConfiguration in Startup.cs file like this:
Install these mandatory packages:

Microsoft.AspNet.WebApi.OwinSelfHost
Microsoft.AspNet.WebApi.Owin
Microsoft.Owin.Hosting
Microsoft.Owin.Host.SystemWeb

Add a new web api Blogs, start the project and check with a client like postman the url api/blogs

Add a new web api Posts, with two get with an id as parameter, the first one is to get all post of a blog, the second one is
to get a single post
Add a route attribute to GetBlogPosts action

# OData

Create Blogs ODataController and Posts ODataController, remove useless ApiController
Add the route configuration in Startup.cs file; the configuration is specified in the ODataController if it was created with scaffolding
With postman check some calls like these:

/odata/$metadata
/odata/Blogs
/odata/Blogs(guid'cad6651d-7a2c-434b-883b-cbd3ab5d57c8')
/odata/Posts
/odata/Posts(guid'cad6651d-7a2c-434b-883b-cbd3ab5d57c3')?$expand=Blog
/odata/Posts(guid'cad6651d-7a2c-434b-883b-cbd3ab5d57c3')?$expand=Blog&$select=Title,Content,Blog/Url

# Dependency Injection

Install Autofac, Autofac.WebApi2
Change ContextFactory as non static class
Add ModuloCore.cs
Add the configuration in Startup.cs file

var containerBuilder = new ContainerBuilder();
containerBuilder.RegisterModule(new ModuloCore());
containerBuilder.RegisterApiControllers(Assembly.GetExecutingAssembly());
var container = containerBuilder.Build();

var config = new HttpConfiguration
{
    DependencyResolver = new AutofacWebApiDependencyResolver(container)
};

