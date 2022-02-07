#! /bin/bash

user=$1
server=$2

scp -r ../K8S $user@$server:~/dev
scp setup.sh $user@$server:~/dev
scp start.sh $user@$server:~/dev