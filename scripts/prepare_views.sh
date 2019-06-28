#!/bin/bash

DEVENV_DIR="/tmp/devenv";

echo "starting at the base directory..."
pushd .; pwd; 

echo "copying views into _build/primo-explore/custom..."; 
rm -rf $DEVENV_DIR/primo-explore || true;
git clone https://github.com/bulib/primo-explore-devenv-bu.git $DEVENV_DIR/primo-explore 
rm -rf $DEVENV_DIR/primo-explore/.git

mkdir $DEVENV_DIR/primo-explore/custom/EMPTY; # create a new view folder for ./empty_view
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

echo "'npm install'-ing each of those zips within that view"
cd $DEVENV_DIR/primo-explore/custom/EMPTY; pwd;
npm install;  # install anything put into the empty_view package.json
npm install primo-explore-*.tgz;  # install the newly packed customizations from the previous step
# rm primo-explore-*.tgz;

echo "returning to base directory..."
popd; pwd;