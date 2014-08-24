##################################################
#
# App 0.2.0 image
#
##################################################

FROM      theverything/node_docker

MAINTAINER Jeffreyhorn <j3ffhorn@gmail.com>

VOLUME ["/app"]

RUN npm install -g nodemon

ADD . /app
