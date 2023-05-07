#!/bin/bash
sudo chmod -R 777 /home/ec2-user/moi-app
#navigating into our working directory where we have all our github files
cd /home/ec2-user/moi-app

#add npm and node to path
export NVM_DIR= "$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh"] && \. "$NVM_DIR/nvm.sh" #load nvm
[ -s "$NVM_DIR/bash-completion" ] && \. "$NVM_DIR/bash-completion" #loads nvm bash_completion (node is in path)

#install node modules
npm install

#install our node app in the background
node app.js > app.out.log 2> app.err.log < /dev/null &