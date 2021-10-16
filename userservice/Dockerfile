FROM openjdk:16-alpine3.13
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} userservice-1.0.jar
ENTRYPOINT ["java", "-jar","/userservice-1.0.jar"]