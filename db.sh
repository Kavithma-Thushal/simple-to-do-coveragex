#!/bin/sh

echo "MySQL is connecting..."

while ! mysqladmin ping -h db -P 3306 --silent; do
  sleep 1
done

echo "MySQL is connected!"

# Run migrations
php artisan migrate --force

# Start server
php artisan serve --host=0.0.0.0 --port=8000