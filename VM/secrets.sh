#! /bin/bash

kubectl create secret generic mysql-root-pass --from-literal=password=password
kubectl create secret generic mysql-user-pass --from-literal=username=user
kubectl create secret generic mysql-db-url --from-literal=database=awtl
kubectl create secret generic mysql-usr-pass --from-literal=password=userpassword
kubectl create secret generic redis-pass --from-literal=password=redispassword