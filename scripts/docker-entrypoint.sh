#!/usr/bin/env sh
set -e

echo "[entrypoint] Starting container entrypoint"

RETRIES=10
DELAY=3
COUNT=0

run_prisma_commands() {
  echo "[entrypoint] Running prisma generate"
  npx prisma generate --schema=prisma/schema.prisma

  echo "[entrypoint] Running prisma migrate deploy"
  npx prisma migrate deploy --schema=prisma/schema.prisma
}

until run_prisma_commands || [ "$COUNT" -ge "$RETRIES" ]; do
  COUNT=$((COUNT + 1))
  echo "[entrypoint] Prisma migrate failed - retrying (${COUNT}/${RETRIES}) in ${DELAY}s..."
  sleep $DELAY
done

if [ "$COUNT" -ge "$RETRIES" ]; then
  echo "[entrypoint] Prisma migrate failed after ${RETRIES} attempts; starting app anyway."
fi

echo "[entrypoint] Starting application: $@"
exec "$@"
