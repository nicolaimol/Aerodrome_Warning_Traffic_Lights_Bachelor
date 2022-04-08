FROM jboss/keycloak:16.1.0

USER jboss

COPY ./keycloak/themes/met /opt/jboss/keycloak/themes/met
COPY ./keycloak/themes/keycloakv2/account/resources/public/met-logo.svg /opt/jboss/keycloak/themes/keycloak.v2/account/resources/public/
COPY ./keycloak/themes/keycloakv2/account/resources/public/met-logo-green.svg /opt/jboss/keycloak/themes/keycloak.v2/account/resources/public/

RUN sed -i -e 's/<web-context>auth<\/web-context>/<web-context>keycloak\/auth<\/web-context>/' $JBOSS_HOME/standalone/configuration/standalone.xml
RUN sed -i -e 's/<web-context>auth<\/web-context>/<web-context>keycloak\/auth<\/web-context>/' $JBOSS_HOME/standalone/configuration/standalone-ha.xml
RUN sed -i -e 's/name="\/"/name="\/keycloak\/"/' $JBOSS_HOME/standalone/configuration/standalone.xml
RUN sed -i -e 's/name="\/"/name="\/keycloak\/"/' $JBOSS_HOME/standalone/configuration/standalone-ha.xml
RUN sed -i -e 's/\/auth/\/keycloak\/auth/' $JBOSS_HOME/welcome-content/index.html
RUN sed -i -e 's/<web-context>auth<\/web-context>/<web-context>keycloak\/auth<\/web-context>/' $JBOSS_HOME/domain/configuration/domain.xml