#!/usr/bin/env bash 
# Launch a local preview in http://localhost:8003/primo-explore/search?vid=CENTRAL_PACKAGE

VIEW=CENTRAL_PACKAGE
CUSTOM_DIR="./node_modules/primo-explore-devenv/primo-explore/custom/$VIEW"

if [ ! -d "$CUSTOM_DIR" ]; then 
  mkdir -p "$CUSTOM_DIR"
  ln -s "$(pwd)/js" "$CUSTOM_DIR/js"
  ln -s "$(pwd)/html" "$CUSTOM_DIR/html"
  ln -s "$(pwd)/css" "$CUSTOM_DIR/css"
  ln -s "$(pwd)/img" "$CUSTOM_DIR/img"
fi

# prepare the repository 
cp ./packages/unpaywall/src/unpaywall.module.js $CUSTOM_DIR/js/
cp ./packages/help-menu/src/help-menu.js $CUSTOM_DIR/js/
cp ./config.js $CUSTOM_DIR/js/
cp ./main.js $CUSTOM_DIR/js/
cd $CUSTOM_DIR

gulp run \
  --view "$VIEW" \
  --proxy 'https://primo-qa.hosted.exlibrisgroup.com' \
  --browserify