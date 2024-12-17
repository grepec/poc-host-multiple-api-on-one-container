# poc-host-multiple-api-on-one-container

This project demonstrates how to host multiple ASP.NET Core APIs within a single Docker container using Traefik as a reverse proxy.

## Project Structure

- **Dockerfile**: The main Dockerfile which builds and hosts the APIs.
- **src/API.A**: Source code for API A.
- **src/API.B**: Source code for API B.
- **src/API.A/Dockerfile**: Dockerfile for building API A.
- **src/API.B/Dockerfile**: Dockerfile for building API B.

## Prerequisites

- Docker
- .NET SDK

## Setup and Running the Project

1. **Clone the repository**:
   ```bash
   git clone https://github.com/grepec/poc-host-multiple-api-on-one-container.git
   cd poc-host-multiple-api-on-one-container
   ```
2. **Build and run the Docker container**:
    ```bash
    docker build -t multi-api-container .
    docker run -p 80:80 multi-api-container
    ```
3. **Access the APIs**:
    * API A: [http://localhost/api1](http://localhost/api1)
    * API B: [http://localhost/api2](http://localhost/api2)


## Dockerfile Explanation
* Build Stages:
    
    * build-apia and build-apib stages compile and publish the respective APIs.
    * publish-apia and publish-apib stages publish the APIs to /app/publish.
* Final Stage:
    * Installs Traefik.
    * Copies the published APIs.
    * Configures Traefik to route requests to the APIs.
    * Creates a startup script to run Traefik and both APIs.

## Additional Information

* Traefik Configuration: The traefik.toml and dynamic.yaml files configure Traefik to route traffic to the APIs.
* Startup Script: The start.sh script starts Traefik and both APIs, and handles shutdown signals to stop all processes gracefully.##
