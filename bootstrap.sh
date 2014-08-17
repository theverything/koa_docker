#!/usr/bin/env bash

apt-get update
apt-get install -y curl git htop unzip nano
apt-get install -y ruby python
apt-get install -y python-pip
curl -sSL https://get.docker.io/ubuntu/ | sudo sh
echo -e "\nDOCKER_OPTS=\"-H tcp://127.0.0.1:4243 -H unix:///var/run/docker.sock\"" >> /etc/default/docker
echo -e "\nexport DOCKER_HOST=tcp://localhost:4243" >> ~/.bashrc
pip install -U fig
