#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["./services/NS.Pagamentos.API/NS.Pagamentos.API.csproj", "services/NS.Pagamentos.API/"]
COPY ["./building blocks/NS.Core/NS.Core.csproj", "building blocks/NS.Core/"]
COPY ["./services/NS.Pagamentos.NerdPag/NS.Pagamentos.NerdPag.csproj", "services/NS.Pagamentos.NerdPag/"]
COPY ["./building blocks/NS.MessageBus/NS.MessageBus.csproj", "building blocks/NS.MessageBus/"]
COPY ["./building blocks/NS.APICore/NS.APICore.csproj", "building blocks/NS.APICore/"]
RUN dotnet restore "services/NS.Pagamentos.API/NS.Pagamentos.API.csproj"
COPY . .
WORKDIR "services/NS.Pagamentos.API"
RUN dotnet build "NS.Pagamentos.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NS.Pagamentos.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NS.Pagamentos.API.dll"]