# `primo-explore-help-menu` [![npm package](https://img.shields.io/npm/v/primo-explore-help-menu.svg)](https://www.npmjs.com/package/primo-explore-help-menu)

Add link to customizable 'help-menu' popup to `prm-search-bookmark-filter-after` (top nav bar)


### Screenshots

**dialog window with content list**
![help-menu dialog](https://github.com/bulib/primo-explore-bu/blob/master/packages/help-menu/img/help-menu_dialog.png?raw=true)

**opened in new window with item selected**
![help-menu window](https://github.com/bulib/primo-explore-bu/blob/master/packages/help-menu/img/help-menu_window.png?raw=true)


### Usage

#### Adding the Package to your view in `primo-explore` 

run the following command from within your view's main directory to add it as a dependency.

```bash
$ npm install --save-dev primo-explore-help-menu
```

this should add the following line to your `package.json` file...
```json
"primo-explore-help-menu": "^1.0.1"
```

and add the contents of this repository (at that npm version) into a `node_modules/primo-explore-help-menu` 
  directory for your current view. the presence of this package should mean that the package was successfully 
  installed and added to your project.

#### Installing/Importing it 

from here you'll have to edit your `main.js` (or `config.module.js`) file to import the package, and add
   _both_ `'helpMenuContentDisplay'` and `'helpMenuTopbar'`, to the dependencies inside of your 
   `'viewCustom'` module:

```js
angular.module('viewCustom', ['angularLoad', 'helpMenuContentDisplay',  'helpMenuTopbar'])
``` 
  
if you're using `--browserify`, the import line should be `import 'primo-explore-help-menu';` and a working example 
  of the whole thing should be found in `src/.main.js`.

if you're not, (i.e. you're still using `custom.module.js` with raw concatenation), simply copy/paste the 
  `help-menu.js` file from `node_modules/primo-explore-help-menu` into your `js/` directory and use
  `import './help-menu.js';` instead. 

_note: additions from `1.1.0` forward will not be visible unless you have an `help_en_US.html` uploaded_

#### Adding Content 

To add your own content, specify a `list_of_elements` variable within a `constant` object called `'helpMenuConfig'` and attach it 
  to your primo angular module (`app`) like so:

```js
// main.js
import {my_custom_list_of_elements} from 'my_long_list_of_json_objects';

app.constant('helpMenuConfig', { "list_of_elements": my_custom_list_of_elements });
```

Make sure that each object in the list of elements matches the following structure:
```json
{
  "id":"my-custom-help-entry",
  "title":"My Custom Help Entry",
  "icon":{"group":"action", "code":"description"},
  "description":"brief description of the entry's purpose (optional)",
  "template":"<h3>A valid Heading</h3><p>relevant information below that heading</p>"
}
```

...including intentionally empty objects in the list (`{}`) to form the dividers.

_note: the [iconset being used](https://material.io/tools/icons/) is from material.io and is included within primo_


#### Additional Customization

the following table describes describes some additional configuration options that are currently afforded to 
  you by the package. an example implementation of this section can be found within this repo at `src/.main.js`:

|name|default|description|
|:------|:-----|:----------|
|`logToConsole`|`true`|controls whether or not messages about what's going on in the component are `console.log()`-ed (visible in inspector)|
|`publishEvents`|`false`|controls whether the `logEventToAnalytics` is actually triggered, ensurng only real traffic is tracked|
|`logEventToAnalytics`|_see example_|here's an opportunity to hook in whatever event tracking you have, (we use google analytics)|
|`helpMenuWidth`|`500` (px)|the width of the dialog box and associated popup|

### Contributing

You're more than welcome to fork this repository, make some changes, and contribute it back by 
  [creating a pull request](https://github.com/bulib/primo-explore-bu/compare). 

If you have any issues with this package or ideas for how to make it better, don't hesitate to let us know by 
  [submitting a new issue](https://github.com/bulib/primo-explore-bu/issues/new).

In both of these cases, it would help us if you make sure to add on the appropriate 
  [labels](https://github.com/bulib/primo-explore-bu/labels) (including especially `help-menu`) so that we 
  can keep track of what your pull request or issue relates to.

If you get stuck, send us a message on [our gitter](https://gitter.im/bulib/developers), and we'll try to help you out.