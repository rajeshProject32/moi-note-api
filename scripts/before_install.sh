#!/bin/bash

#download node and npm
sudo su -
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

#create our working directory if it doesn't exists
DIR="/home/ec2-user/moi-app"
if [ -d "$DIR" ]; then
echo "${DIR} exists"
else
echo "Creating ${DIR} directory"
mkdir ${DIR}
fi 