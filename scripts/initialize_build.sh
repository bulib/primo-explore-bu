#!/bin/bash

echo "installing (and moving) the latest 'ExLibrisGroup/primo-explore-devenv' to '_build/'...";
npm install;
# mv ./node_modules/primo-explore-devenv ./_build/;  # TODO: switch back to ExL package  
git clone https://github.com/cooldudezach/primo-explore-devenv.git ./_build
pwd; 

echo "installing _build/ dependencies and returning...";
cd _build; pwd;
npm install -g gulp;
npm install;

echo "updating the gulp config with our own PROXY_SERVER";
sed -i.before_1 "s/http:\/\/il-primo17:1703/https:\/\/bu-primostage.hosted.exlibrisgroup.com:443/" ./gulp/config.js;
sed -i.before_2 "s/http:\/\/your-server:your-port/https:\/\/bu-primostage.hosted.exlibrisgroup.com:443/g" ./gulp/config.js;
cd ..; pwd;