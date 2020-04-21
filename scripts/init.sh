#!/bin/bash

# install dependencies within primo-explore-devenv
if [ ! -d "./node_modules/primo-explore-devenv" ]; then
npm --prefix ./node_modules/primo-explore-devenv \
  install ./node_modules/primo-explore-devenv
fi

# set variables for directory and view
VIEW=CENTRAL_PACKAGE
CUSTOM_DIR="./node_modules/primo-explore-devenv/primo-explore/custom/$VIEW"

# prepare directory structure
if [ ! -d "$CUSTOM_DIR" ]; then 
  mkdir -p "$CUSTOM_DIR"
  ln -s "$(pwd)/src" "$CUSTOM_DIR/js"
fi

initial_dir=$(pwd);
cd "./node_modules/primo-explore-devenv";
npm install
cd "$initial_dir"