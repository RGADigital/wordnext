FROM wordpress:latest

COPY ./backend /var/www/html/
COPY ./config/uploads.ini /usr/local/etc/php/conf.d/uploads.ini

EXPOSE 8888
