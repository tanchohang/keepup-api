# Base on offical NGINX Alpine image
FROM nginx:alpine

#Install certbot dependencies
RUN apk add python3 python3-dev py3-pip build-base libressl-dev musl-dev libffi-dev rust cargo
RUN pip3 install pip --upgrade
RUN pip3 install certbot-nginx
RUN mkdir /etc/letsencrypt

# Remove any existing config files
# RUN rm /etc/nginx/conf.d/*


# Copy config files
# *.conf files in conf.d/ dir get included in main config
COPY ./original.conf /etc/nginx/conf.d/default.conf
# COPY ./letsencrypt/ /etc/letsencrypt/


# Expose the listening port
EXPOSE 80
EXPOSE 443
EXPOSE 3500





# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]

#ENTRYPOINT nginx && certbot --nginx -n --agree-tos -d tanchohang.dev -d www.tanchohang.dev -m tanchohang@gmail.com && (crontab -l ; echo "0 12 * * * /usr/bin/certbot renew --quiet")| crontab -


# ENTRYPOINT [ "nginx" ]

#Certbot configuration
# RUN certbot --nginx -n --agree-tos -d api.skyvault.tanchohang.dev -d www.api.skyvault.tanchohang.dev -d skyvault.tanchohang.dev -d www.skyvault.tanchohang.dev -m tanchohang@gmail.com