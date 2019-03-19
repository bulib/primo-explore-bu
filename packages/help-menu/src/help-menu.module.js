import {sample_list_of_elements} from './help-menu-content';
import {helpMenuContentDisplayTemplate, helpMenuDialogTemplate} from './help-menu-templates';

// handle optional configuration variables
const optionalConfigName = 'helpMenuConfig';
const optionalStudioName = 'primoExploreHelpMenuStudioConfig';
const logEventToGoogleAnalytics = function(category, action, label){ 
  window.ga('send','event',category, action, label);
}

// configurable logging, event-handling, and interaction with help content
let helpMenuHelper = {
  logToConsole: true,
  publishEvents: true,
  helpMenuWidth: 500,
  list_of_elements: sample_list_of_elements,
  logMessage: function(message){
    if(this.logToConsole){ console.log("bulibHelpMenu) " + message); }
  },
  logEventToAnalytics: function(category, action, label){
    logEventToGoogleAnalytics(category, action, label);
  },
  logHelpEvent: function(action, label=window.location.pathname){
    let category = "help-menu";
    this.logMessage(`logging '${category}' event with action: '${action}', label:'${label}'. [publish: ${this.publishEvents}]`);

    if(this.publishEvents){
      this.logEventToAnalytics(category, action, label);
    }
  },
  get_entry_by_id: function(id){
    for(let i=0; i<this.list_of_elements.length; i++){
      if(this.list_of_elements[i].id === id){ return this.list_of_elements[i]; }
    }
    return {}
  },
  override_with_config: function(config){
    if(!config || !Object.keys(config)){ return; }
    if(config.logToConsole){ this.debug = config.logToConsole; }
    if(config.publishEvents){ this.publishEvents = config.publishEvents; }
    if(config.helpMenuWidth){ this.helpMenuWidth = config.helpMenuWidth; }
    if(config.logEventToAnalytics){ this.logEventToAnalytics = config.logEventToAnalytics; }
    if(config.list_of_elements){ this.list_of_elements = config.list_of_elements; }
  }
};

const mainHelpMenuController = function(helpMenuHelper, $injector, $scope, $timeout, $mdDialog){  
  // look for the optional 'helpMenuConfig' if present
  let config = {}
  if($injector.has(optionalConfigName)){
    config = $injector.get(optionalConfigName);
  }
  if($injector.has(optionalStudioName)){
    config = $injector.get(optionalStudioName)
  }
  helpMenuHelper.override_with_config(config);

  // determine whether to show the help menu (separate window)
  let hrefArgs = window.location.search; 
  $scope.showHelpMenu = hrefArgs.includes("page=help");
  
  // gather items in list from helpMenuHelper
  $scope.helpContentList = helpMenuHelper.list_of_elements;
  
  // modal navigation
  $scope.hide = function() { $mdDialog.hide(); };
  $scope.back = function() { $scope.entry = null; };
  $scope.openItem = function(id){
    $scope.entry = helpMenuHelper.get_entry_by_id(id);
    helpMenuHelper.logHelpEvent("select-item", id);
  };

  // trigger the help-menu to open as a popup and return focus to main page
  $scope.openHelpInNewWindow = function(item_id=""){
    let help_event_label = window.location.pathname;
    let params=`width=${helpMenuHelper.helpMenuWidth},height=800,resizable=0,location=0,menubar=0,scrollbars=yes`;
    let help_page_url = window.location.pathname + window.location.search + '&page=help'; // @TODO: change from 'page=help' into help-url
    
    // if present, send and log the 'help-option' instead of the url
    if(item_id){ 
      help_page_url += "#"+item_id; 
      help_event_label = item_id;
    }

    helpMenuHelper.logHelpEvent("open-window", help_event_label);
    open(help_page_url, 'BULibraries Help Menu', params);
    $scope.hide();
  }

  // set currently selected item from the anchor/hash (#___) right after load
  $timeout(function(){
    let helpOptionId = window.top.location.hash.substring(1);
    if(helpOptionId){ $scope.openItem(helpOptionId); }
  }, 10);
}

// help content by replacing everything else on the 
angular.module('helpMenuContentDisplay', [])
  .constant('helpMenuHelper', helpMenuHelper)
  .controller('helpMenuPopupController', ['helpMenuHelper', '$injector', '$scope', '$timeout', '$mdDialog', mainHelpMenuController])
  .component('prmExploreMainAfter', {
    template: `
      <help-menu-content-display>
        <div ng-if="showHelpMenu">${helpMenuContentDisplayTemplate}</div>
      </help-menu-content-display>`,
    controller: 'helpMenuPopupController'
  });

// topbar button and the dialog content it triggers 
angular.module('helpMenuTopbar', ['ngMaterial'])
  .constant('helpMenuHelper', helpMenuHelper)
  .controller('helpMenuDialogController', ['helpMenuHelper', '$injector', '$scope', '$timeout', '$mdDialog', mainHelpMenuController])
  .controller('helpMenuTopbarController', ['helpMenuHelper', '$injector', '$mdDialog',
    function(helpMenuHelper, $injector, $mdDialog){
      // look for the optional 'helpMenuConfig' if present
      let config = {}
      if($injector.has(optionalConfigName)){
        config = $injector.get(optionalConfigName);
      }
      if($injector.has(optionalStudioName)){
        config = $injector.get(optionalStudioName)
      }
      helpMenuHelper.override_with_config(config);

      this.openHelpMenu = function(ev){
        helpMenuHelper.logHelpEvent( "open-dialog", window.location.pathname);
        $mdDialog.show({
          controller: 'helpMenuDialogController',
          template: helpMenuDialogTemplate(helpMenuHelper.helpMenuWidth),
          targetEvent: ev,
          hasBackdrop: true,
          multiple: false,
          clickOutsideToClose:true,
          fullscreen: false,
          focusOnOpen: true
        });
      };
    }
  ])
  .component('prmSearchBookmarkFilterAfter', {
    template: `
      <help-menu-topbar>
        <div class="layout-align-center layout-row">
          <a class="md-icon-button button-over-dark md-button md-primoExplore-theme md-ink-ripple"
                    aria-label="Open Search Help Menu" ng-click="$ctrl.openHelpMenu($event)" 
                    href="#" title="open help menu">
            <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_help_24px"></prm-icon>
          </a>
        </div>
      </help-menu-topbar>`,
    controller: 'helpMenuTopbarController'
  });
