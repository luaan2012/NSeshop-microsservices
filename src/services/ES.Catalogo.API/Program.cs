using ES.Catalogo.API.Configuration;
using NS.APICore.Extensions;
using NS.APICore.Identity;
using NS.Catalog.API.Configuration;
using NS.Catalogo.API.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddAppsettingsEnvironment(builder.Environment);

builder.Services.AddApiConfiguration(builder.Configuration);

builder.Services.AddMessageBusConfiguration(builder.Configuration);

builder.Services.AddJwtConfiguration(builder.Configuration);

builder.Services.AddSwaggerConfiguration();

builder.Services.AddDependecyConfig();

var app = builder.Build();

app.UseSwaggerConfiguration();

app.UseApiConfiguration(builder.Environment);

app.Run();
