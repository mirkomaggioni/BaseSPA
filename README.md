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




