#!/bin/bash

# Wait for Cassandra to be ready
echo "Waiting for Cassandra to start..."
MAX_ATTEMPTS=120
ATTEMPT=1

until cqlsh cassandra-db -u cassandra -p cassandra -e "SELECT release_version FROM system.local" 2>/dev/null; do
  if [ $ATTEMPT -gt $MAX_ATTEMPTS ]; then
    echo "Cassandra failed to start after $MAX_ATTEMPTS attempts"
    exit 1
  fi
  echo "Cassandra is unavailable - sleeping ($ATTEMPT/$MAX_ATTEMPTS)"
  ATTEMPT=$((ATTEMPT + 1))
  sleep 1
done

echo "Cassandra is ready - initializing schema..."
cqlsh cassandra-db -u cassandra -p cassandra -f /init.cql

echo "Schema initialization complete"
