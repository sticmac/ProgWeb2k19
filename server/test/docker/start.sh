#!/usr/bin/env bash

docker build -t mongo-vietnam .

docker run -d -p 27017:27017 mongo-vietnam

while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:27017)" != "200" ]]; do
    echo "."
    sleep 10
done

node ./init.js