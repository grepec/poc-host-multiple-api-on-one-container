# Build API 1
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-apia
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/API.A/API.A.csproj", "src/API.A/"]
RUN dotnet restore "./src/API.A/API.A.csproj"
COPY . .
WORKDIR "/src/src/API.A"
RUN dotnet build "./API.A.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build-apia AS publish-apia
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./API.A.csproj" -c $BUILD_CONFIGURATION -o /app/publish/API.A /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-apib
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/API.B/API.B.csproj", "src/API.B/"]
RUN dotnet restore "./src/API.B/API.B.csproj"
COPY . .
WORKDIR "/src/src/API.B"
RUN dotnet build "./API.B.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build-apib AS publish-apib
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./API.B.csproj" -c $BUILD_CONFIGURATION -o /app/publish/API.B /p:UseAppHost=false

FROM node:18 AS build-react
WORKDIR /app
COPY react-app/package.json ./
RUN npm install
COPY react-app ./
RUN npm run build

# Final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Install Node.js and npx
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install Traefik
ADD https://github.com/traefik/traefik/releases/download/v2.10.0/traefik_v2.10.0_linux_amd64.tar.gz /traefik.tar.gz
RUN tar -zxvf /traefik.tar.gz -C /usr/local/bin/ \
    && rm /traefik.tar.gz

# Copy APIs
COPY --from=publish-apia /app/publish/API.A /app/API.A
COPY --from=publish-apib /app/publish/API.B /app/API.B

COPY --from=build-react /app/dist /app/react-app

# Create traefik.toml
RUN mkdir -p /etc/traefik && \
    echo 'api:\n\
  dashboard: true\n\
  insecure: true\n\
\n\
entryPoints:\n\
  web:\n\
    address: ":80"\n\
\n\
providers:\n\
  file:\n\
    filename: /etc/traefik/dynamic.yaml\n\
\n\
log:\n\
  level: "DEBUG"\n\
' > /etc/traefik/traefik.yaml

# Create dynamic configuration with middlewares
RUN echo 'http:\n\
  middlewares:\n\
    strip-api1:\n\
      stripPrefix:\n\
        prefixes:\n\
          - "/api1"\n\
    strip-api2:\n\
      stripPrefix:\n\
        prefixes:\n\
          - "/api2"\n\
    strip-static:\n\
      stripPrefix:\n\
        prefixes:\n\
          - "/static"\n\
\n\
  services:\n\
    api1:\n\
      loadBalancer:\n\
        servers:\n\
          - url: "http://localhost:5001"\n\
    api2:\n\
      loadBalancer:\n\
        servers:\n\
          - url: "http://localhost:5002"\n\
    static:\n\
      loadBalancer:\n\
        servers:\n\
          - url: "http://localhost:5003"\n\
    assets:\n\
      loadBalancer:\n\
        servers:\n\
          - url: "http://localhost:5003"\n\
\n\
  routers:\n\
    api1:\n\
      rule: "PathPrefix(`/api1`)" \n\
      service: "api1"\n\
      middlewares:\n\
        - strip-api1\n\
    api2:\n\
      rule: "PathPrefix(`/api2`)" \n\
      service: "api2"\n\
      middlewares:\n\
        - strip-api2\n\
    static:\n\
      rule: "PathPrefix(`/static`)" \n\
      service: "static"\n\
      middlewares:\n\
        - strip-static\n\
    assets:\n\
      rule: "PathPrefix(`/assets`)" \n\
      service: "assets"\n\
' > /etc/traefik/dynamic.yaml

# Create start script
RUN echo '#!/bin/bash\n\
\n\
# Start Traefik\n\
/usr/local/bin/traefik --configfile=/etc/traefik/traefik.toml &\n\
TRAEFIK_PID=$!\n\
\n\
# Start API 1\n\
cd /app/API.A\n\
dotnet API.A.dll --urls="http://localhost:5001" &\n\
API1_PID=$!\n\
\n\
# Start API 2\n\
cd /app/API.B\n\
dotnet API.B.dll --urls="http://localhost:5002" &\n\
API2_PID=$!\n\
\n\
# Start static content server\n\
cd /app/react-app\n\
npx http-server -p 5003 &\n\
STATIC_PID=$!\n\
\n\
# Handle shutdown\n\
trap "kill $TRAEFIK_PID $API1_PID $API2_PID" SIGTERM\n\
\n\
# Wait for all processes\n\
wait $TRAEFIK_PID $API1_PID $API2_PID' > /start.sh

RUN chmod +x /start.sh

EXPOSE 80 8080

ENTRYPOINT ["/start.sh"]