#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["./web/WebMVC/NS.WebMVC.csproj", "web/WebMVC/"]
COPY ["./building blocks/NS.APICore/NS.APICore.csproj", "building blocks/NS.APICore/"]
COPY ["./building blocks/NS.Core/NS.Core.csproj", "building blocks/NS.Core/"]
RUN dotnet restore "web/WebMVC/NS.WebMVC.csproj"
COPY . .
WORKDIR "web/WebMVC"
RUN dotnet build "NS.WebMVC.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NS.WebMVC.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NS.WebMVC.dll"]