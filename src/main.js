// import configuration variables
import { 
  ENV_PRODUCTION, INCLUDE_UNPAYWALL, INCLUDE_HELP_MENU 
} from './config.js';

// import versions locally
import './help-menu';
import './unpaywall.module';

// determine which dependencies to include 
let module_dependencies = ['angularLoad'];
if(INCLUDE_UNPAYWALL){ module_dependencies.push('bulibUnpaywall'); }
if(INCLUDE_HELP_MENU){ module_dependencies.push('helpMenuContentDisplay',  'helpMenuTopbar'); }

// load custom view package with configuration constants
angular.module('viewCustom', module_dependencies)

  // configure helpMenuConfig || primoExploreHelpMenuStudioConfig
  .constant('helpMenuConfig', {
    "logToConsole":!ENV_PRODUCTION,
    "publishEvents":ENV_PRODUCTION,
    "list_of_elements":ls_help_menu_items,
    "helpMenuWidth":550
  })

  // configure unpaywallConfig || primoExploreUnpaywallStudioConfig
  .component('prmSearchResultAvailabilityLineAfter', {
    template: '<bulib-unpaywall></bulib-unpaywall>'
  })
  .constant('unpaywallConfig', {
    "email":"aidans@bu.edu",
    "logToConsole":!ENV_PRODUCTION,
    "publishEvents":ENV_PRODUCTION,
    "overrideOACheck":false
  })