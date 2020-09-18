# primo-explore-bu 

assorted customizations to Ex Libris Primo New UI created, consumed, and maintained by BU Libraries.

## Description

### About This Repository

This is a [monorepo](https://en.wikipedia.org/wiki/Monorepo) containing an assortment of npm packages for use
  with [`exLibrisGroup/primo-explore-devenv`](https://github.com/exLibrisGroup/primo-explore-devenv/).

These packages can be deployed separately using their individual names (e.g. `primo-explore-help-menu`),
  or together (in aggregate) via `primo-explore-bu`.

The `main.js` file is a representative one, demonstrating how to consume and customize each package
  using the `browserify` method in the [Primo New UI](https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/Primo/New_Primo_User_Interface)
  (untested in [Primo VE](https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/020Primo_VE)).

### Background

- Primo "New" UI offers a lot of options for configuring and customizing your installation and adding on new features
- One of the most effective ways of doing this is by creating and consuming these customizations with [`npm`](https://docs.npmjs.com/about-npm/)
- This repository exists to manage and share back the customizations we've created as npm packages.

|name|npm package|description|
|:------|:-----|:----------|
|`unpaywall`|[![npm package](https://img.shields.io/npm/v/primo-explore-unpaywall.svg)](https://www.npmjs.com/package/primo-explore-unpaywall)|add 'Open Access available via unpaywall' link to `search-result-availability-line-after`|
|`help-menu`|[![npm package](https://img.shields.io/npm/v/primo-explore-help-menu.svg)](https://www.npmjs.com/package/primo-explore-help-menu)|Add link to customizable 'help-menu' popup to `prm-search-bookmark-filter-after` (top nav bar)|
|`outbound-links`|[![npm package](https://img.shields.io/npm/v/primo-explore-outbound-links.svg)](https://www.npmjs.com/package/primo-explore-outbound-links)|add event tracking to outbound links contained in `prm-service-links`|

## Contributing

You're more than welcome to fork this repository, make some changes, and contribute it back by
  [creating a pull request](https://github.com/bulib/primo-explore-bu/compare).

If you have any issues with this package or ideas for how to make it better, don't hesitate to let us know by
  [submitting a new issue](https://github.com/bulib/primo-explore-bu/issues/new).

In both of these cases, it would help us if you make sure to add on the appropriate
  [labels](https://github.com/bulib/primo-explore-bu/labels) so that we
  can keep track of what your pull request or issue relates to.

If you get stuck, please email us at <a href="mailto:libwebsv@bu.edu">libwebsv@bu.edu</a> with the name of 
  the repository or package you're having trouble with and we'll try to help you out.
