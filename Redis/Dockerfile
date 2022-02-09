FROM redis:7.0-rc1-alpine
COPY ./redis.conf /usr/local/etc/redis/redis.conf
CMD ["redis-server", "--requirepass", "$REDIS_PASSWORD"]