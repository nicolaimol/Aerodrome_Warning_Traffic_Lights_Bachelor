#! /bin/bash

kubectl apply -f K8S/frontend.yaml -f K8S/backend.yaml -f K8S/ingress.yaml -f K8S/dns.yaml