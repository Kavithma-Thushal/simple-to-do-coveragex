#!/bin/sh
# backend/wait-for-db.sh
echo "Waiting for MySQL..."

# Wait until MySQL container is ready
while ! mysqladmin ping -h db -P 3306 --silent; do
  sleep 1
done

echo "MySQL is ready!"

# Run migrations
php artisan migrate --force

# Start Laravel server
php artisan serve --host=0.0.0.0 --port=8000
