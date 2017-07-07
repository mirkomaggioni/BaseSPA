
using System.Data.Entity;

namespace BaseSPA.Core
{
	public class ContextFactory
	{
		public TContext GetContext<TContext>() where TContext : DbContext, new()
		{
			return new TContext();
		}
	}
}
