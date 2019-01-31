#!/usr/bin/env bash

docker build -t mongo-vietnam .

docker run -d -p 27017:27017 mongo-vietnam

until nc -z localhost 27017
do
    print "."
    sleep 1
done

node ./init.js