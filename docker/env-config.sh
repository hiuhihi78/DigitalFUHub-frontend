#!/bin/sh
# Runs when the nginx container starts (/docker-entrypoint.d/).
# Writes env-config.js from every WEB_* environment variable (prefix removed),
# e.g. WEB_API_BASE_URL -> window._env_.API_BASE_URL. Only put public values in WEB_*.
set -eu

out=/usr/share/nginx/html/env-config.js
{
    echo "window._env_ = {"
    env | grep '^WEB_' | sort | while IFS='=' read -r key value; do
        value=$(printf '%s' "$value" | sed 's/\\/\\\\/g; s/"/\\"/g')
        printf '    "%s": "%s",\n' "${key#WEB_}" "$value"
    done
    echo "};"
} > "$out"
echo "env-config.js: $(env | grep -c '^WEB_' || true) value(s)"
