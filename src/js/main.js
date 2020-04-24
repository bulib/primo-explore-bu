var  module_dependencies = ['angularLoad'];

// import configuration variables
import './unpaywall.module';
var INCLUDE_UNPAYWALL = true;
if(INCLUDE_UNPAYWALL){ module_dependencies.push('bulibUnpaywall'); }

// import help menu
import './help-menu';
var INCLUDE_HELP_MENU = true;
if(INCLUDE_HELP_MENU){ module_dependencies.push('helpMenuContentDisplay',  'helpMenuTopbar'); }

// load custom view package with configuration constants
angular.module('centralCustom', module_dependencies)

  // configure helpMenuConfig || primoExploreHelpMenuStudioConfig
  .constant('helpMenuConfig', {
    "logToConsole":true,
    "publishEvents":false,
    "helpMenuWidth":550
  })

  // configure unpaywallConfig || primoExploreUnpaywallStudioConfig
  .component('prmSearchResultAvailabilityLineAfter', {
    template: '<bulib-unpaywall></bulib-unpaywall>'
  })
  .constant('unpaywallConfig', {
    "email":"aidans@bu.edu",
    "logToConsole":true,
    "publishEvents":false,
    "overrideOACheck":false
  })