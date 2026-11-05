# Multi-stage Dockerfile for Spring Boot Backend on Render
# Stage 1: Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Cache dependencies
COPY backend/pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build jar
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime environment
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy the built executable jar
COPY --from=build /app/target/*.jar app.jar

# Render assigns port dynamically via $PORT (Spring Boot reads ${PORT:8080})
EXPOSE 8080

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]

