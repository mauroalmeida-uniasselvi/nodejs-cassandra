#!/bin/bash

echo "clean compose from previous execution"
docker compose down -v

echo "start compose in detached mode"
docker compose up -d

echo "waiting for cassandra to be ready"
ATTEMPT=1
while [ "$(docker inspect -f '{{.State.Health.Status}}' cassandra-db 2>/dev/null)" != "healthy" ]; do
  echo -n "."
  ATTEMPT=$((ATTEMPT + 1))
  sleep 1
done

echo "update cassandra after waiting $ATTEMPT seconds"
docker exec cassandra-db cqlsh -u cassandra -p cassandra -f /init.cql

echo "building application"
docker build -t nodejs-cassandra .

echo "remove previous container application if exists"
docker rm -f nodejs-cassandra 2>/dev/null

echo "starting application"
docker run -it --rm \
  --name nodejs-cassandra \
  --network nodejs-cassandra_default \
  -e NODE_ENV=development \
  -e CASSANDRA_CONTACT_POINTS=cassandra-db:9042 \
  -e CASSANDRA_LOCAL_DC=datacenter1 \
  -e CASSANDRA_KEYSPACE=uniasselvi \
  -v "$(pwd)":/usr/src/app \
  nodejs-cassandra

echo "finished application run"

echo "remove application image"
docker rmi nodejs-cassandra

echo "clean compose from previous execution"
docker compose down -v

