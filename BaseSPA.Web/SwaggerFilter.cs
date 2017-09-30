using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;
using Swashbuckle.Swagger;

namespace BaseSPA.Web
{
	public class SwaggerFilter: IOperationFilter
	{
		public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
		{
			var toBeAuthorize = apiDescription.GetControllerAndActionAttributes<AuthorizeAttribute>().Any();

			if (toBeAuthorize)
			{
				if (operation.parameters == null)
					operation.parameters = new List<Parameter>();

				operation.parameters.Add(new Parameter()
				{
					name = "Authorization",
					@in = "header",
					description = "bearer token",
					required = true,
					type = "string"
				});
			}
		}
	}
}