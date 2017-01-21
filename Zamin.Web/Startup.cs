using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Music4Biz.Web.Startup))]
namespace Music4Biz.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
