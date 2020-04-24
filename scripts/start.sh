#!/bin/bash 
# Launch a local preview in http://localhost:8003/primo-explore/search?vid=TEST

VIEW=CENTRAL_PACKAGE
CUSTOM_DIR="./node_modules/primo-explore-devenv/primo-explore/custom/$VIEW"

# copy current versions of each package to the main 'src' repo
cp packages/help-menu/dist/help-menu.js ./src/js
cp packages/unpaywall/src/unpaywall.module.js ./src/js

# link custom directory with current one
if [ ! -d "$CUSTOM_DIR" ]; then 
  mkdir -p "$CUSTOM_DIR"
  ln -s "$(pwd)/src/js" "$CUSTOM_DIR/js"
  ln -s "$(pwd)/src/html" "$CUSTOM_DIR/html"
  ln -s "$(pwd)/src/css" "$CUSTOM_DIR/css"
  ln -s "$(pwd)/src/img" "$CUSTOM_DIR/img"
fi

if [ ! -d "./node_modules/primo-expore-devenv" ]; then
npm --prefix ./node_modules/primo-explore-devenv \
  install ./node_modules/primo-explore-devenv
fi

cd ./node_modules/primo-explore-devenv/

gulp run \
  --view "$VIEW" \
  --proxy 'https://bu-primostage.hosted.exlibrisgroup.com:443' \
  --browserify