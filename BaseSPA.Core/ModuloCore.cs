using Autofac;

namespace BaseSPA.Core
{

	public class ModuloCore : Module
	{
		protected override void Load(ContainerBuilder builder)
		{
			builder.RegisterType<ContextFactory>().AsSelf().SingleInstance();
		}
	}
}
