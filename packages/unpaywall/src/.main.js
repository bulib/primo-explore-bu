// import npm package by name (recommended)
import 'primo-explore-unpaywall';

// import copy/pasted 'unpaywall.module.js' locally from js/
// import './unpaywall.module';

//load app 'viewCustom' as a module with [] dependencies
var app = angular.module('viewCustom', ['angularLoad', 'bulibUnpaywall']);

// - configure unpaywall - //
app.component('prmSearchResultAvailabilityLineAfter', {
    template: '<bulib-unpaywall></bulib-unpaywall>'
  })
  .constant('unpaywallConfig', {
    "email":"<your_username>@<your_institution>.edu",
    "showOnResultsPage":true,
    "overrideOACheck":false,
    "showVersionLabel":true,
    "logToConsole":true,
    "showDebugTable":false,
    "publishEvents":false,
    "logEvent":function(category, action, label){
      window.ga('send', 'event', category, action, label);
    },
    "labelText":"View Open Access Version",
    "imageUrl":"https://upload.wikimedia.org/wikipedia/commons/archive/2/25/20181007070735%21Open_Access_logo_PLoS_white.svg",
    "imageStyle":"width: 20px; padding-right:5px; vertical-align: middle;"
  });
