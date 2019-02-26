//load app 'viewCustom' as a module with [] dependencies
var app = angular.module('viewCustom', ['angularLoad']);

// - configure unpaywall - //
app.constant('unpaywallConfig', {
  "email":"<your_username>@<your_institution>.edu",
  "showOnResultsPage":true,
  "showVersionLabel":true,
  "logToConsole":true,
  "showDebugTable":false,
  "publishEvents":false,
  "logEvent":function(category, action, label, logToConsole=true, publishEvent=false){
    if(logToConsole){ console.log("custom 'logEvent' called for action:'" + action + "' and publish:" + publishEvent + "."); }
    if(publishEvent){ window.ga('send', 'event', category, action, label); }
  }
});