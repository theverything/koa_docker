##################################################
#
# App 0.2.0 image
#
##################################################

FROM      theverything/node_docker

MAINTAINER Jeffreyhorn <j3ffhorn@gmail.com>

RUN npm install -g nodemon

VOLUME ["/app"]

ADD . /app
