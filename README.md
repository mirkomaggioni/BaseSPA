# Blog
Base SPA

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






