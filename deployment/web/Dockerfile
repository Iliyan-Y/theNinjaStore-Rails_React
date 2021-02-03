FROM nginx
RUN apt-get update -qq && apt-get -y install apache2-utils

COPY public /usr/share/nginx/html
COPY ./deployment/web/nginx.conf /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]