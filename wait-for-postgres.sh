#!/bin/sh

while ! nc -z ${POSTGRES_HOST} ${POSTGRES_PORT}; do
  echo "Attente de PostgreSQL... 🌺"
  sleep 1
done

echo "PostgreSQL est disponible, lancement du backend ! ✅"
exec node server.js
