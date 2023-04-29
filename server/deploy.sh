#!/bin/bash

echo "Running composer"
composer global require hirak/prestissimo
composer install --no-dev 

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

ls -a

echo "Running migrations..."
php artisan migrate --force