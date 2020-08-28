// import configuration variables
import { 
  ENV_PRODUCTION, INCLUDE_UNPAYWALL, INCLUDE_OUTBOUND_LINKS, INCLUDE_HELP_MENU 
} from './config.js';
import {sample_list_of_updates, sample_list_of_items} from './packages/help-menu/src/help-menu-content';

// import npm packages
import 'primo-explore-help-menu';
import 'primo-explore-outbound-links';
import 'primo-explore-unpaywall';

// determine which dependencies to include 
let module_dependencies = ['angularLoad'];
if(INCLUDE_UNPAYWALL){ module_dependencies.push('bulibUnpaywall'); }
if(INCLUDE_OUTBOUND_LINKS){ module_dependencies.push('outboundLinksLogger'); }
if(INCLUDE_HELP_MENU){ module_dependencies.push('helpMenuContentDisplay',  'helpMenuTopbar'); }

// load custom view package with configuration constants
angular.module('viewCustom', module_dependencies)

  // configure helpMenuConfig || primoExploreHelpMenuStudioConfig
  .constant('helpMenuConfig', {
    "logToConsole":!ENV_PRODUCTION,
    "publishEvents":ENV_PRODUCTION,

    "helpMenuTitle":"Search Menu",
    "helpMenuWidth":500,
    "updatesLabel":"Search Updates",
    "list_of_updates":sample_list_of_updates,
    "entriesLabel":"Help Entries",
    "list_of_elements":sample_list_of_items,

    "enableNotificationIndicator":true,
    "notificationIndicatorExpiration": 1000 * 60 * 60 * 24 * 7 * 2,  // 2 weeks

    "logEventToAnalytics":function(category, action, label){
      window.ga('send', 'event', category, action, label);
    }
  })

  // configure outboundLinksConfig
  .constant('outboundLinksConfig', {
    "logToConsole":!ENV_PRODUCTION,
    "publishEvents":ENV_PRODUCTION
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