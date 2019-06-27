#!/bin/bash

echo "copying initial 'empty_view' into _build/..."; pwd;
mkdir _build/primo-explore; mkdir _build/primo-explore/custom/; mkdir _build/primo-explore/custom/VIEW; #todo remove after unhidden from ExL package
cp -r ./empty_view/* _build/primo-explore/custom/VIEW;

echo "creating an 'npm pack'-ed export of each addon (./packages/) and moving it to built view";
for d in ./packages/*/; do
  cd $d; pwd;
  npm install;
  npm run build || true;
  npm pack;
  mv primo-explore-*.tgz ../../_build/primo-explore/custom/VIEW;
  cd ../..; pwd;
done;

echo "'npm install'-ing each of those zips within that view"
cd ./_build/primo-explore/custom/VIEW; pwd;
npm install;  # install anything put into the empty_view package.json
npm install primo-explore-*.tgz;  # install the newly packed customizations from the previous step
rm primo-explore-*.tgz;
cd ../../../..; pwd;