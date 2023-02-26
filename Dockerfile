#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/services/ES.Catalogo.API/NS.Catalogo.API.csproj", "src/services/ES.Catalogo.API/"]
COPY ["src/building blocks/NS.APICore/NS.APICore.csproj", "src/building blocks/NS.APICore/"]
COPY ["src/building blocks/NS.Core/NS.Core.csproj", "src/building blocks/NS.Core/"]
COPY ["src/building blocks/NS.MessageBus/NS.MessageBus.csproj", "src/building blocks/NS.MessageBus/"]
RUN dotnet restore "src/services/ES.Catalogo.API/NS.Catalogo.API.csproj"
COPY . .
WORKDIR "/src/src/services/ES.Catalogo.API"
RUN dotnet build "NS.Catalogo.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NS.Catalogo.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NS.Catalogo.API.dll"]