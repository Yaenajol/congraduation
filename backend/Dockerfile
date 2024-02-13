FROM openjdk:17-jdk-slim
COPY build/libs/backend-0.0.1-*.jar app.jar
ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Seoul" ,"app.jar"]