#!/bin/bash

echo "downloading the latest 'ExLibrisGroup/primo-explore-devenv' from git into '_build/'...";
git clone https://github.com/ExLibrisGroup/primo-explore-devenv.git _build;

echo "installing dependencies and returning..."
cd _build;
sed -i.before "s/your-server:your-port/bu-primostage.hosted.exlibrisgroup.com:443/g" ./gulp/config.js
npm install -g gulp; 
npm install;
cd ..;