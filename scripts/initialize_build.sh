#!/bin/bash

echo "downloading the latest 'ExLibrisGroup/primo-explore-devenv' from git into '_build/'...";
git clone https://github.com/ExLibrisGroup/primo-explore-devenv.git _build;

echo "installing dependencies and returning..."
cd _build;
npm install gulp; 
npm install;
cd ..;