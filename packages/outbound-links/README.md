# `primo-explore-outbound-links` [![npm package](https://img.shields.io/npm/v/primo-explore-outbound-links.svg)](https://www.npmjs.com/package/primo-explore-outbound-links)

Add event tracking to outbound links contained in `prm-service-links`.

### Usage

#### Adding the Package to your view in `primo-explore` 

run the following command from within your view's main directory to add it as a dependency.

```bash
$ npm install --save-dev primo-explore-outbound-links
```

this should add the following line to your `package.json` file...
```json
"primo-explore-outbound-links": "^0.5.1"
```

and add the contents of this repository (at that npm version) into a `node_modules/primo-explore-outbound-links` 
  directory for your current view. the presence of this package should mean that the package was successfully 
  installed and added to your project.

#### Installing/Importing it 

from here you'll have to edit your `main.js` (or `config.module.js`) file to import the package, and add `outboundLinksLogger` to the
  dependencies inside of your 'viewCustom' module:

```
angular.module('viewCustom', ['angularLoad', 'outboundLinksLogger'])
``` 
  
if you're using `--browserify`, the import line should be `import 'primo-explore-outbound-links';` and a working example 
  of the whole thing should be found in `src/.main.js`.

if you're not, (i.e. you're still using `custom.module.js` with raw concatenation), simply copy/paste the 
  `outbound-links.module.js` file from `node_modules/primo-explore-outbound-links` into your `js/` directory and use
  `import './outbound-links.module.js';` instead. 

#### Configuring via `outboundLinksConfig`

in order to make this useful to other libraries/configurations, we've abstracted the main logging method. if you don't 
  have your google anayltics setup on `window.ga` like we do, you'll need to set up in order to get any value from the package.

our package attempts to read its options as variables within a `constant` object attached to the primo angular module (`app`). 
  to get this packaged to work, simply create a new constant with the name `outboundLinksConfig`, specifying the `logEvent` 
  like so:

```js
// main.js
import {loggingFunction} from './my_analytics_helpers';
app.constant('outboundLinksConfig', { "logEvent": loggingFunction });
```

#### Additional Customization

the following table describes describes some additional configuration options that are currently afforded to 
  you by the package. an example implementation of this section can be found within this repo at `src/.main.js`:

|name|default|description|
|:------|:-----|:----------|
|`logToConsole`|`true`|controls whether or not messages about what's going on in the component are `console.log()`-ed (visible in inspector)|
|`publishEvents`|`false`|we use this variable within our sample implementation to ensure only real traffic is tracked (not us debugging/developing/testing)|

### Contributing

You're more than welcome to fork this repository, make some changes, and contribute it back by 
  [creating a pull request](https://github.com/bulib/primo-explore-bu/compare). 

If you have any issues with this package or ideas for how to make it better, don't hesitate to let us know by 
  [submitting a new issue](https://github.com/bulib/primo-explore-bu/issues/new).

In both of these cases, it would help us if you make sure to add on the appropriate 
  [labels](https://github.com/bulib/primo-explore-bu/labels) (including especially `outbound-links`) so that we 
  can keep track of what your pull request or issue relates to.

If you get stuck, send us a message on [our gitter](https://gitter.im/bulib/developers), and we'll try to help you out.