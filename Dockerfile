##################################################
#
# App 0.1.0 image
#
##################################################

FROM      ubuntu:14.04

MAINTAINER Jeffreyhorn <j3ffhorn@gmail.com>

# Install packages
RUN \
  sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list && \
  apt-get update && \
  apt-get -y upgrade && \
  apt-get install -y build-essential && \
  apt-get install -y software-properties-common && \
  apt-get install -y curl git htop unzip nano && \
  apt-get install -y ruby
  apt-get install -y libssl-dev

# Install Bundler
RUN gem install bundle --no-ri --no-rdoc

# Install Node 0.11.13
RUN \
  mkdir /opt/node && \
  cd /opt/node && \
  curl -L http://nodejs.org/dist/v0.11.13/node-v0.11.13-linux-x64.tar.gz | tar -zx --strip 1 && \
  ln -s /opt/node/bin/node /usr/bin/node && \
  ln -s /opt/node/bin/npm /usr/bin/npm

# Set Working Dir
RUN mkdir /app
WORKDIR /app

ADD . /app
