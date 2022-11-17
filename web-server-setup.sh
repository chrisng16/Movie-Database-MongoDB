#!/usr/bin/env bash

echo "
----------------------
  NODE & NPM
----------------------
"
# Install Nodejs and npm using Ubuntu repo
sudo apt update
sudo apt install nodejs npm

echo "
----------------------
  MONGODB
----------------------
"
# Import the public key used by the package management system.
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create a list file for MongoDB.
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo service mongod start


echo "
----------------------
  PM2
----------------------
"
# install pm2 with npm
sudo npm install -g pm2

# set pm2 to start automatically on system startup
sudo pm2 startup systemd

echo "
----------------------
  NGINX
----------------------
"

# install nginx
sudo apt install -y nginx


echo "
----------------------
  UFW (FIREWALL)
----------------------
"

# allow ssh connections through firewall
sudo ufw allow OpenSSH

# allow http & https through firewall
sudo ufw allow 'Nginx Full'

# enable firewall
sudo ufw --force enable
