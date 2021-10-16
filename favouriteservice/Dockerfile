FROM java:8-jre
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} favouriteservice-1.0.jar
ENV MONGO_URL=mongodb://localhost:27017/FavouriteDB
ENTRYPOINT ["java", "-jar","/favouriteservice-1.0.jar"]