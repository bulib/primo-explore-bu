// import npm package by name (after `$ npm install --save-dev primo-explore-help-menu` is run)
import 'primo-explore-help-menu';

// import list of help-menu entries from another js file
import {help_menu_items} from './help-menu-content';

//load app 'viewCustom' as a module with [] dependencies
var app = angular.module('viewCustom', ['angularLoad', 'helpMenuContentDisplay',  'helpMenuTopbar']);

// - configure help-menu - //
app.constant('helpMenuConfig', {
  "list_of_elements":help_menu_items,
  "logToConsole":true,
  "publishEvents":false,
  "enableNotificationIndicator":true,
  "notificationIndicatorExpiration": 1000 * 60 * 60 * 24 * 7 * 2,  // 2 weeks
  "helpMenuTitle":"Search Menu",
  "helpMenuWidth":500,
  "logEventToAnalytics":function(category, action, label){
    window.ga('send', 'event', category, action, label);
  }
});
