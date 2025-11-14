# Multi-stage build for ASP.NET Core + Angular
# This Dockerfile should be run from the WorldCities directory

# Stage 1: Build Angular frontend
FROM node:18-alpine AS angular-builder
WORKDIR /src
COPY worldcities.client/package*.json ./
RUN npm ci
COPY worldcities.client/ ./
RUN npm run build -- --configuration production

# Stage 2: Build ASP.NET Core backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dotnet-builder
WORKDIR /src

# Copy csproj and restore dependencies
COPY WorldCities.Server/WorldCities.Server.csproj ./WorldCities.Server/
RUN dotnet restore ./WorldCities.Server/WorldCities.Server.csproj

# Copy everything else and build
COPY WorldCities.Server/ ./WorldCities.Server/
RUN dotnet publish ./WorldCities.Server/WorldCities.Server.csproj -c Release -o /app/publish

# Copy Angular build output to wwwroot
COPY --from=angular-builder /src/dist/worldcities.client /app/publish/wwwroot

# Stage 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy published app
COPY --from=dotnet-builder /app/publish .

# Expose port (Railway, Render, Fly.io use PORT env var)
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "WorldCities.Server.dll"]

