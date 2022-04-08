#! /bin/bash

#kubectl create secret generic mysql-root-pass --from-literal=password=password
#kubectl create secret generic mysql-user-pass --from-literal=username=user
#kubectl create secret generic mysql-db-url --from-literal=database=awtl
#kubectl create secret generic mysql-usr-pass --from-literal=password=userpassword
#kubectl create secret generic redis-pass --from-literal=password=redispassword
kubectl create secret generic postgres-user --from-literal=user=postgressuser
kubectl create secret generic postgres-db --from-literal=db=keycloak
kubectl create secret generic postgres-password --from-literal=password=postgrespassword
#kubectl create secret generic keycloak-user --from-literal=user=metawtl
#kubectl create secret generic keycloak-password --from-literal=password=awtl170120Admin+
