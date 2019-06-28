#!/bin/bash

pushd .; pwd;

# install packages for that view
cd /tmp/devenv/primo-explore/custom/EMPTY/
npm install;
npm install ./primo-explore-*.tgz || true;

# run the view with gulp
gulp run --view=EMPTY --browserify;

popd; pwd;