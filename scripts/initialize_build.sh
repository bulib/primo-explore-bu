#!/bin/bash

echo "installing (and moving) the latest 'ExLibrisGroup/primo-explore-devenv' to '_build/'...";
# get the devenv from npm 
# npm install;
# mv ./node_modules/primo-explore-devenv ./_build/;  # TODO: switch back to ExL package when npm and node get updated

# get a fork of the devenv from github
git clone https://github.com/ExLibrisGroup/primo-explore-devenv.git /tmp/devenv
rm -rf /tmp/devenv/.git

echo "installing dependencies and returning...";
pushd .
cd /tmp/devenv; pwd;
npm install -g gulp;
npm install;

echo "updating the gulp config with our own PROXY_SERVER";
sed -i.before_1 "s/http:\/\/il-primo17:1703/https:\/\/bu-primostage.hosted.exlibrisgroup.com:443/" ./gulp/config.js;
sed -i.before_2 "s/http:\/\/your-server:your-port/https:\/\/bu-primostage.hosted.exlibrisgroup.com:443/g" ./gulp/config.js;
popd; pwd;