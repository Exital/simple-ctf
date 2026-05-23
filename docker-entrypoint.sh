#!/bin/sh
set -e

if [ -z "$FLAG" ]; then
  if command -v openssl >/dev/null 2>&1; then
    RANDOM_HEX=$(openssl rand -hex 5)
  else
    RANDOM_HEX=$(head -c 5 /dev/urandom | od -An -tx1 | tr -d ' \n')
  fi
  export FLAG="CTF{${RANDOM_HEX}}"
  echo "Generated FLAG: $FLAG"
else
  echo "Using provided FLAG"
fi

# Persist for shells/scripts (docker exec does not inherit entrypoint exports)
printf 'export FLAG=%s\n' "$FLAG" > /etc/profile.d/ctf-flag.sh
printf 'FLAG=%s\n' "$FLAG" > /etc/ctf-flag.env
chmod 644 /etc/profile.d/ctf-flag.sh /etc/ctf-flag.env

exec env FLAG="$FLAG" "$@"
