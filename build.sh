#!/usr/bin/env bash

cd ./client/

npm run build

cp -r dist/* ../server/public/