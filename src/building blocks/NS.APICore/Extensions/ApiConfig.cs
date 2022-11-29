using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace NS.APICore.Extensions
{
    public static class ApiConfig
    {
        public static void AddCorsGeral(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("Total",
                    builder => builder
                                    .AllowAnyOrigin()
                                    .AllowAnyMethod()
                                    .AllowAnyHeader());
            });
        }

        public static void AddAppsettingsEnvironment(this ConfigurationManager config, IHostEnvironment hostEnvironment)
        {
            config
            .SetBasePath(hostEnvironment.ContentRootPath)
            .AddJsonFile("appsettings.json", true, true)
            .AddJsonFile($"appsettings.{hostEnvironment.EnvironmentName}.json", true, true)
            .AddEnvironmentVariables();
        }
    }
}
