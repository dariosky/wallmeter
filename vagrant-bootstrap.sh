#!/usr/bin/env bash

# node.js
apt-get install -y npm curl
npm cache clean -f
npm install -g n
n stable

# meteor
curl https://install.meteor.com/ | sh

# set a link to .meteor/local outside shared folder, to make Mongo works
rm -rf /vagrant/.meteor/local
mkdir /wallmeter-local
ln -s /wallmeter-local /vagrant/.meteor/local

# the same for packages who contain npm-container
rm -rf /vagrant/packages
mkdir /wallmeter-packages
ln -s /wallmeter-packages /vagrant/packages

