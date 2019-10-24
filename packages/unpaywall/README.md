# `primo-explore-unpaywall` [![npm package](https://img.shields.io/npm/v/primo-explore-unpaywall.svg)](https://www.npmjs.com/package/primo-explore-unpaywall)

Add 'Open Access available via unpaywall' link to `search-result-availability-line-after` in Primo New UI

### Screenshots

**On Item Display...**
/primo-explore/fulldisplay
![unpaywall-link_fulldisplay](https://github.com/bulib/primo-explore-bu/blob/master/packages/unpaywall/img/unpaywall-link_fulldisplay.png?raw=true)

**On Results List (optionally)...**
/primo-explore/search
![unpaywall-link_results-list](https://github.com/bulib/primo-explore-bu/blob/master/packages/unpaywall/img/unpaywall-link_results-list.png?raw=true)

### Background

#### Purpose
- We created this add-on to  **increase open access** to online records for our patrons.
- This helps to increase overall access to our user whether or not they're logged in or we subscribe to the content in the results 
  (e.g. "Primo Central Index - Include Results with no full-text")
- At BU, this results in around 50,000 additional open access links a week added exclusively to items that are not marked as `oa`

#### `unpaywall` API usage
- This functionality is made possible by a call to [unpaywall.org](https://unpaywall.org/)'s API 
  (e.g. [`https://api.oadoi.org/v2/{doi}?email={email}"`](https://api.unpaywall.org/v2/10.1038/nature12373?email=YOUR_EMAIL)).
- Its [rate limits](https://unpaywall.org/products/api) are extremely leniant (100,000 calls a day), and we never hit them 
  (we do around half of that), but your mileage may vary (depending on how many of your results have DOIs [see 'How it Works' below]).
- If you _do_ hit the limit, set `showOnResultsPage` to `false`. [see 'Additional Customization']
- _note: this project is in no way sponsored by or affiliated with the unpaywall organization_

#### `primo-explore-oadoi-link`
- This customization was inspired by and originally developed on top of [`alliance-pcsg`](https://github.com/alliance-pcsg/)'s 
  [`primo-explore-oadoi-link`](https://github.com/alliance-pcsg/primo-explore-oadoi-link/) customization, and owes very
  much to their great work.
- While we did seek to recontribute our changes to that repository (and not create our own 'fork' of it) and did
  end up creating a [pull request](https://github.com/alliance-pcsg/primo-explore-oadoi-link/pull/4).
- We decided to publish our's independently for the following reasons:
  - **increased flexibility/control**: having our own `npm` package allows us to make changes more quickly
  - **sufficient distinction**: our package uses the same API with a similar approach, but...
    - has entirely different templates/displays
    - is loaded into a different component/location on different pages (`full-view-service-container-after` vs `search-result-availability-line-after`)
    - has additional logging functionality and customizations
    - shared little code with the original project (pre-merge) and required an entirely new `app.module` anyway.
    - duplicates the functionality of the original package (would show the same link twice on the same page
      (/primo-explore/fulldisplay)
  - **maintenance and versioning**: having our own project ensures we don't affecting existing users and can version
      our work as we go

#### How it Works

Wherever a `<prm-search-result-availability-after>` tag appears (/primo-explore/search, /primo-explore/fulldisplay), we...
1. look in its parentController (`prmSearchResultAvailability`) for the item info contained in it's `result` variable
2. if there's a doi (`doi`) in there and it's not already marked as open access (`oa`)* use it to make a call to
  the afore-mentioned unpaywall api.
3. if that call ends up being successful, look for an open access download link (`successResponse.data.best_oa_location`)
4. if it has that, grab the url for it and place it right beneath the other "Online Access Available" link.

_note: (*) you can override this OA check (so that a call is made wherever a DOI is found) by setting `overrideOACheck` in your `unpaywallConfig`_

### Usage

#### Adding the Package to your view in `primo-explore`

run the following command from within your view's main directory to add it as a dependency.

```bash
$ npm install --save-dev primo-explore-unpaywall
```

this should add the following line to your `package.json` file...

```json
"primo-explore-unpaywall": "^1.3.2"
```

and add the contents of this repository (at that npm version) into a `node_modules/primo-explore-unpaywall`
  directory for your current view. the presence of this package should mean that the package was successfully
  installed and added to your project.

#### Installing/Importing it

from here you'll have to edit your `main.js` (or `config.module.js`) file to import the package, and
  add `bulibUnpaywall` to the dependencies inside of your 'viewCustom' module. 

```js
import 'primo-explore-unpaywall';
angular.module('viewCustom', ['angularLoad', 'bulibUnpaywall']);
```
  
to protect against the situation in which you already have a component for `prmSearchResultAvailabilityLineAfter`,
  you'll also have to add a `<bulib-unpaywall></bulib-unpaywall>` component as such:

```js
app.component('prmSearchResultAvailabilityLineAfter', {
  template: '<bulib-unpaywall></bulib-unpaywall>'
});
```

_note: an example of the setup for this can be seen in the `.main.js` file_

#### Configuring via `unpaywallConfiguration`

to afford you with as much control as possible (and since we needed you to add your email for the unpaywall
  API call to work anyway), we've added some configuration options that you'll need to set up in order to run the
  package effectively

our package attempts to read its options as variables within a `constant` object attached to the primo angular module (`app`).
  to get this packaged to work, simply create a new constant with the name `unpaywallConfig`, specifying the `email` you'd
  like us to append to your unpaywall request:

```js
// main.js
app.constant('unpaywallConfig', { "email":"<your_username>@<your_institution>.edu" });
```

#### Additional Customization

the following table describes describes some additional configuration options that are currently afforded to
  you by the package. an example implementation of this section can be found within this repo at `src/.main.js`:

|name|default|description|
|:------|:-----|:----------|
|`logEvent`|_see example_|here's an opportunity to hook in whatever event tracking you have, (we use google analytics)|
|`showOnResultsPage`|`true`|determine whether the link is added to each item in the list of results|
|`overrideOACheck`|`false`|disable the `addata.oa` check so that the unpaywall check runs on all items with an available DOI|
|`showVersionLabel`|`true`|sometimes the unpaywall OA response qualifies the stage of publication the work was OA-available in (`Submitted`, `Published`, `Accepted`)|
|`logToConsole`|`true`|controls whether or not messages about what's going on in the component are `console.log()`-ed (visible in inspector)|
|`showDebugTable`|`false`|the debug table is a quick way to see unpaywall response data for the record in context a really ugly way (used to help troubleshoot, not meant for end users)|
|`publishEvents`|`false`|we use this variable within our sample implementation to ensure only real traffic is tracked (not us debugging/developing/testing)|
|`labelText`|_see above_|Text/copy for the main call-to-action|
|`imageUrl` |`null`|Alternative image to display with unpaywall link|
|`imageStyle`|_see example_|CSS tweaking to style whatever image you've chosen|

_note: the default for `logEvent` can be found within this repo at `src/.main.js`. it assumes you're using google analytics and calls it via `window.ga`_

### Contributing

You're more than welcome to fork this repository, make some changes, and contribute it back by
  [creating a pull request](https://github.com/bulib/primo-explore-bu/compare).

If you have any issues with this package or ideas for how to make it better, don't hesitate to let us know by
  [submitting a new issue](https://github.com/bulib/primo-explore-bu/issues/new).

In both of these cases, it would help us if you make sure to add on the appropriate
  [labels](https://github.com/bulib/primo-explore-bu/labels) (including especially `unpaywall`) so that we
  can keep track of what your pull request or issue relates to.

If you get stuck, send us a message on [our gitter](https://gitter.im/bulib/developers), and we'll try to help you out.