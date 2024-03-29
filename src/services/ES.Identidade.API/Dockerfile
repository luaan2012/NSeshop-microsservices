#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["/services/ES.Identidade.API/NS.Identidade.API.csproj", "services/ES.Identidade.API/"]
COPY ["/building blocks/NS.MessageBus/NS.MessageBus.csproj", "building blocks/NS.MessageBus/"]
COPY ["/building blocks/NS.Core/NS.Core.csproj", "building blocks/NS.Core/"]
COPY ["/building blocks/NS.APICore/NS.APICore.csproj", "building blocks/NS.APICore/"]
RUN dotnet restore "services/ES.Identidade.API/NS.Identidade.API.csproj"
COPY . .
WORKDIR "services/ES.Identidade.API"
RUN dotnet build "NS.Identidade.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NS.Identidade.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NS.Identidade.API.dll"]