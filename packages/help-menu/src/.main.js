// import npm package by name (from `node_modules/`)
import 'primo-explore-help-menu';

// import copy/pasted 'help-menu.js' in js/
// import '../node_modules/primo-explore-help-menu/dist/help-menu';

// import list of help-menu entries from another js file
import {help_menu_items} from './help-menu-content';

//load app 'viewCustom' as a module with [] dependencies
var app = angular.module('viewCustom', ['angularLoad', 'helpMenuContentDisplay',  'helpMenuTopbar']);

// - configure help-menu - //
app.constant('helpMenuConfig', {
  "list_of_elements":help_menu_items,
  "logToConsole":true,
  "publishEvents":false,
  "logEventToAnalytics":function(category, action, label){
    window.ga('send', 'event', category, action, label);
  }
});