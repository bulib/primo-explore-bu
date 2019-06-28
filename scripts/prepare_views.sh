#!/bin/bash

DEVENV_DIR="/tmp/devenv";

echo "starting at the base directory..."
pushd .; pwd; 

echo "copying views into _build/primo-explore/custom..."; 
rm -rf $DEVENV_DIR/primo-explore || true;

# clone the bu views 
git clone https://github.com/bulib/primo-explore-devenv-bu.git $DEVENV_DIR/primo-explore 
rm -rf $DEVENV_DIR/primo-explore/.git

# add this repo's local ./empty_view
mkdir $DEVENV_DIR/primo-explore/custom/EMPTY; 
cp -r ./empty_view/* $DEVENV_DIR/primo-explore/custom/EMPTY;

echo "creating an 'npm pack'-ed export of each addon (./packages/) and moving it to built view";
for d in ./packages/*/; do
  cd $d; pwd;
  npm install;
  npm run build || true;
  npm pack;
  mv primo-explore-*.tgz $DEVENV_DIR/primo-explore/custom/EMPTY;
  cd ../..; pwd;
done;

echo "returning to base directory..."
popd; pwd;