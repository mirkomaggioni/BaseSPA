using System.Reflection;
using System.Web.Http;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Extensions;
using Autofac;
using Autofac.Integration.WebApi;
using BaseSPA.Core;
using BaseSPA.Core.Models;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(BaseSPA.Web.Startup))]

namespace BaseSPA.Web
{
	public class Startup
	{
		public void Configuration(IAppBuilder app)
		{
			var containerBuilder = new ContainerBuilder();
			containerBuilder.RegisterModule(new ModuloCore());
			containerBuilder.RegisterApiControllers(Assembly.GetExecutingAssembly());
			var container = containerBuilder.Build();

			var config = new HttpConfiguration
			{
				DependencyResolver = new AutofacWebApiDependencyResolver(container)
			};

			var builder = new ODataConventionModelBuilder();
			builder.EntitySet<Blog>("Blogs");
			builder.EntitySet<Post>("Posts");
			config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());

			config.MapHttpAttributeRoutes();

			config.Routes.MapHttpRoute(
				name: "DefaultApi",
				routeTemplate: "api/{controller}/{id}",
				defaults: new { id = RouteParameter.Optional }
			);

			app.UseWebApi(config);
		}
	}
}
