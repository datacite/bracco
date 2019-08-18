FROM phusion/passenger-full:0.9.30
LABEL maintainer="mfenner@datacite.org"

# Set correct environment variables
ENV HOME /home/app

# Use baseimage-docker's init process
CMD ["/sbin/my_init"]

# fetch node10 and yarn sources
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# Set debconf to run non-interactively
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

# Update installed APT packages, clean up when done
RUN apt-get update && \
    apt-get upgrade -y -o Dpkg::Options::="--force-confold" && \
    apt-get install wget git ntp yarn python-dev -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Enable Passenger and Nginx and remove the default site
# Preserve env variables for nginx
RUN rm -f /etc/service/nginx/down && \
    rm /etc/nginx/sites-enabled/default
COPY vendor/docker/webapp.conf /etc/nginx/sites-enabled/webapp.conf
COPY vendor/docker/00_app_env.conf /etc/nginx/conf.d/00_app_env.conf
COPY vendor/docker/cors.conf /etc/nginx/conf.d/cors.conf

# Use Amazon NTP servers
COPY vendor/docker/ntp.conf /etc/ntp.conf

# Copy webapp folder
COPY . /home/app/webapp/

RUN chown -R app:app /home/app/webapp && \
    chmod -R 755 /home/app/webapp

# Install npm packages and build dist
WORKDIR /home/app/webapp
RUN npm install -g ember-cli && \
    yarn install --frozen-lockfile && \
    ember build --environment=production && \
    exit 0

# Expose web
EXPOSE 80
