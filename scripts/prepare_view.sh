#!/bin/bash

# reused variables
view_dir="_build/primo-explore/custom/VIEW"
pack_str="primo-explore*.tgz"

echo "copying initial 'empty_view' into _build/...";
cp -r ./empty_view/ $view_dir

echo "creating an 'npm pack'-ed export of each addon (./packages/) and moving it to built view";
for d in ./packages/*/; do 
  cd $d; pwd;
  npm install; 
  npm run build || true; 
  npm pack;
  mv $pack_str ../../$view_dir;
  cd ../..;
done;

echo "'npm install'-ing each of those zips within that view"
cd $view_dir;
npm install;  # install anything put into the empty_view package.json
npm install $pack_str;  # install the newly packed customizations from the previous step
rm $pack_str;
 