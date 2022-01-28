FROM maven:3.8.4-jdk-11 as maven

RUN mkdir /root/m2 

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN --mount=type=cache,target=/root/.m2  mvn clean package -Dmaven.test.skip
#RUN mvn package

#ENTRYPOINT ["sleep", "10000000"]

FROM tomcat:9.0.58-jre11-openjdk-slim-buster
#9.0.37-jdk11-adoptopenjdk-hotspot
#9.0.58-jdk11-temurin
WORKDIR /usr/local/tomcat/webapps/
RUN rm -rf /usr/local/tomcat/webapps/*
COPY --from=maven /usr/src/app/target/awtl.war /usr/local/tomcat/webapps/ROOT.war
#COPY ./target/awtl.war /usr/local/tomcat/webapps/ROOT.war
#/app.war

ENTRYPOINT ["catalina.sh", "run"]