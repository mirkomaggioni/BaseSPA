using System;
using System.Net.Http.Formatting;
using System.Reflection;
using System.Web.Http;
using System.Web.OData.Builder;
using System.Web.OData.Extensions;
using Autofac;
using Autofac.Integration.WebApi;
using BaseSPA.Core;
using BaseSPA.Core.Models;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json;
using Owin;
using Swashbuckle.Application;

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

			config.MapHttpAttributeRoutes();

			config.Routes.MapHttpRoute(
				name: "DefaultApi",
				routeTemplate: "api/{controller}/{id}",
				defaults: new {id = RouteParameter.Optional}
			);

			var builder = new ODataConventionModelBuilder();
			builder.EntitySet<Blog>("Blogs");
			builder.EntitySet<Post>("Posts");
			config.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
			config.Filter().Expand().Select().OrderBy().MaxTop(null).Count();

			config.EnableSwagger(c =>
				{
					c.SingleApiVersion("v1", "BaseSPA.Web");
					c.OperationFilter<SwaggerFilter>();
					c.PrettyPrint();
					c.IgnoreObsoleteActions();
				}).EnableSwaggerUi();

			// JSON formatter
			JsonMediaTypeFormatter formatter = config.Formatters.JsonFormatter;
			formatter.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;

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

			app.UseWebApi(config);

		}
	}
}
