#!/bin/bash

docker stop socialfood-db
docker rm socialfood-db

docker run --name socialfood-db -p 5444:5432 -e POSTGRES_DB=socialfood -e POSTGRES_PASSWORD=passw -d postgres