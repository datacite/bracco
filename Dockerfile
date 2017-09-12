FROM phusion/passenger-nodejs:0.9.25
MAINTAINER Martin Fenner "mfenner@datacite.org"

# Set correct environment variables
ENV HOME /home/app
ENV PASSENGER_APP_ENV production

# Allow app user to read /etc/container_environment
RUN usermod -a -G docker_env app

# Use baseimage-docker's init process
CMD ["/sbin/my_init"]

# Update installed APT packages, clean up when done
RUN apt-get update && \
    apt-get upgrade -y -o Dpkg::Options::="--force-confold" && \
    apt-get install ntp wget -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# install phantomjs
RUN wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 && \
    bzip2 -d phantomjs-2.1.1-linux-x86_64.tar.bz2 && \
    tar -xvf phantomjs-2.1.1-linux-x86_64.tar && \
    cp phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/bin/phantomjs

# Remove unused SSH service
RUN rm -rf /etc/service/sshd /etc/my_init.d/00_regen_ssh_host_keys.sh

# Enable Passenger and Nginx and remove the default site
# Preserve env variables for nginx
RUN rm -f /etc/service/nginx/down && \
    rm /etc/nginx/sites-enabled/default
COPY vendor/docker/webapp.conf /etc/nginx/sites-enabled/webapp.conf
COPY vendor/docker/00_app_env.conf /etc/nginx/conf.d/00_app_env.conf

# send logs to STDOUT and STDERR
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

# Use Amazon NTP servers
COPY vendor/docker/ntp.conf /etc/ntp.conf

# Copy webapp folder
COPY . /home/app/webapp/
RUN chown -R app:app /home/app/webapp && \
    chmod -R 755 /home/app/webapp

# Install npm packages and build application
WORKDIR /home/app/webapp
RUN /sbin/setuser app npm install && \
    /sbin/setuser app ember build --environment PASSENGER_APP_ENV

# Expose web
EXPOSE 80
