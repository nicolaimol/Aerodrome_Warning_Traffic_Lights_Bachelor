#! /bin/bash

sudo apt-get update
sudo apt-get -y upgrade

curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

sudo usermod -aG docker ubuntu

sudo snap install microk8s --classic --channel=1.23/stable

mkdir ~/.kube
sudo snap install kubectl --classic

sudo usermod -a -G microk8s ubuntu
sudo chown -f -R ubuntu ~/.kube
newgrp microk8s

microk8s config > ~/.kube/config
microk8s start 
microk8s enable ingress dns dashboard storage