using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Owin.Security.OAuth;

namespace BaseSPA.Web
{
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
}