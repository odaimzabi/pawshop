#!/bin/bash

echo "Running composer"
composer global require hirak/prestissimo
composer install --no-dev --working-dir=/var/www/html


ls /var/www/html/vendor

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force

echo "Running app"
php artisan serve