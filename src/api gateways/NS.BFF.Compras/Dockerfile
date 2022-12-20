#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["./api gateways/NS.BFF.Compras/NS.BFF.Compras.csproj", "api gateways/NS.BFF.Compras/"]
COPY ["./building blocks/NS.Core/NS.Core.csproj", "building blocks/NS.Core/"]
COPY ["./building blocks/NS.MessageBus/NS.MessageBus.csproj", "building blocks/NS.MessageBus/"]
COPY ["./building blocks/NS.APICore/NS.APICore.csproj", "building blocks/NS.APICore/"]
RUN dotnet restore "api gateways/NS.BFF.Compras/NS.BFF.Compras.csproj"
COPY . .
WORKDIR "api gateways/NS.BFF.Compras"
RUN dotnet build "NS.BFF.Compras.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NS.BFF.Compras.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NS.BFF.Compras.dll"]