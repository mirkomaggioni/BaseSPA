
using System.Data.Entity;

namespace BaseSPA.Core
{
	public static class ContextFactory
	{
		public static TContext GetContext<TContext>(bool readOnly = false, bool lazyLoad = false) where TContext : DbContext, new()
		{
			var context = new TContext();
			context.Configuration.AutoDetectChangesEnabled = readOnly;
			context.Configuration.ProxyCreationEnabled = lazyLoad;
			context.Configuration.LazyLoadingEnabled = lazyLoad;

			return context;
		}
	}
}
