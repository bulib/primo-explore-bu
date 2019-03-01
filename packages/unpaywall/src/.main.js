// import npm package by name (from `node_modules/`)
import 'primo-explore-unpaywall';

//load app 'viewCustom' as a module with [] dependencies
var app = angular.module('viewCustom', ['angularLoad', 'bulibUnpaywall']);

// - configure unpaywall - //
app.constant('unpaywallConfig', {
  "email":"<your_username>@<your_institution>.edu",
  "showOnResultsPage":true,
  "showVersionLabel":true,
  "logToConsole":true,
  "showDebugTable":false,
  "publishEvents":false,
  "logEvent":function(category, action, label){
    window.ga('send', 'event', category, action, label);
  }
});