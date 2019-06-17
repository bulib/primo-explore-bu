#!/bin/bash

echo "copying initial 'empty_view' into _build/...";
cp -r ./empty_view/ ./_build/primo-explore/custom/VIEW

echo "creating an 'npm pack'-ed export of each addon (./packages/) and adding it to _build/...";
#> for each package...
#>- 'npm run build || true;''
#>- 'npm pack;'
#>- 'mv *.tgz _build;'

echo "'npm install'-ing each of those zips within _build"
#> cd into _build/
#> 'npm install' each of the '.tgz's
#> remove the '.tgz's
 