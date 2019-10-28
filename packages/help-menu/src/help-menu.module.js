import {sample_list_of_elements} from './help-menu-content';
import {helpMenuContentDisplayTemplate, helpMenuDialogTemplate} from './help-menu-templates';

// handle optional configuration variables
const optionalConfigName = 'helpMenuConfig';
const optionalStudioName = 'primoExploreHelpMenuStudioConfig';
const logEventToGoogleAnalytics = function(category, action, label){
  if(window.ga){ window.ga('send','event',category, action, label); }
}

// configurable logging, event-handling, and interaction with help content
let helpMenuHelper = {
  logToConsole: false,
  publishEvents: false,
  helpMenuWidth: 500,
  list_of_elements: sample_list_of_elements,
  logMessage: function(message){
    if(this.logToConsole){ console.log("bulib-help-menu) " + message); }
  },
  logEventToAnalytics: function(category, action, label){
    logEventToGoogleAnalytics(category, action, label);
  },
  logHelpEvent: function(action, label=window.location.pathname){
    // prepare (and logMessage regarding) the event sent to the `logEventToAnalytics`
    let category = "help-menu";
    this.logMessage(`logging '${category}' event with action: '${action}', label:'${label}'. [publish: ${this.publishEvents}]`);

    if(this.publishEvents){
      this.logEventToAnalytics(category, action, label);
    }
  },
  get_entry_by_id: function(id){
    // return a specified entry from 'list_of_elements' for the specified id (or {})
    for(let i=0; i<this.list_of_elements.length; i++){
      if(this.list_of_elements[i].id === id){ return this.list_of_elements[i]; }
    }
    return {}
  },
  override_with_config: function(config){
    // if a custom configuration is found, update current settings to what's specified
    if(!config || !Object.keys(config)){ return; }
    if(Object.keys(config).includes("logToConsole")){ this.logToConsole = config.logToConsole; }
    if(Object.keys(config).includes("publishEvents")){ this.publishEvents = config.publishEvents; }
    if(Object.keys(config).includes("helpMenuWidth")){ this.helpMenuWidth = config.helpMenuWidth; }
    if(Object.keys(config).includes("helpMenuTitle")){ this.helpMenuTitle = config.helpMenuTitle; }
    if(Object.keys(config).includes("logEventToAnalytics")){ this.logEventToAnalytics = config.logEventToAnalytics; }
    if(Object.keys(config).includes("list_of_elements")){ this.list_of_elements = config.list_of_elements; }
  }
};

// the shared controller containing the logic for selecting, closing, and loading the help-menu 
const mainHelpMenuController = function(helpMenuHelper, $injector, $scope, $timeout, $mdDialog){

  // look for the optional 'helpMenuConfig' if present
  let config = {}
  if($injector.has(optionalConfigName)){ config = $injector.get(optionalConfigName); }
  if($injector.has(optionalStudioName)){ config = $injector.get(optionalStudioName); }
  helpMenuHelper.override_with_config(config);

  // gather items in list from helpMenuHelper
  $scope.helpContentList = helpMenuHelper.list_of_elements;
  $scope.helpMenuTitle = helpMenuHelper.helpMenuTitle;

  // modal navigation
  $scope.hide = function() { $mdDialog.hide(); };
  $scope.back = function() {
    $scope.entry = null;
    window.top.location.hash="";
  };
  $scope.openItem = function(id, count_as_click=true){
    $scope.entry = helpMenuHelper.get_entry_by_id(id);
    if(count_as_click){ helpMenuHelper.logHelpEvent("select-item", id); }
  };

  // set the currently selected item from the hash in the url
  $scope.setEntryIdFromHash = function(count_as_click=true) {
    let helpOptionId = window.location.hash.substring(1);
    if(helpOptionId){ $scope.openItem(helpOptionId, count_as_click); }
  }

  // trigger the help-menu to open in a new window and return focus to main page
  $scope.openHelpInNewWindow = function(item_id=""){
    let help_event_label = window.location.pathname;
    let help_page_url = "/primo-explore/static-file/help" + window.location.search;

    // if present, send and log the 'help-option' instead of the url
    if(item_id){
      help_page_url += "#"+item_id;
      help_event_label = item_id;
    }

    // open the help-menu in a new-window
    let popup_title = helpMenuHelper.helpMenuTitle || "Search Help Menu";
    let params=`width=${helpMenuHelper.helpMenuWidth},height=800,resizable=0,location=0,menubar=0,scrollbars=yes`;
    helpMenuHelper.logHelpEvent("open-window", help_event_label);
    let help_popup = open(help_page_url, popup_title, params);
    help_popup.onload = function() { this.document.title = popup_title; }

    // prepare new window to handle 'select-option' via the '#', and close the dialog
    help_popup.addEventListener('hashchange',$scope.setEntryIdFromHash,true);
    $scope.hide();
  }

  // after the page finishes loading, trigger a check to see which entry to open 
  $timeout($scope.setEntryIdFromHash(false), 10);

  // keep listening for changes in the page's 'hash' to see which entry to show (e.g. '/path/to#hash')
  window.addEventListener('hashchange',$scope.setEntryIdFromHash,true);

  // listen for any 'openHelpMenuEvent' to open menu in a new window
  window.addEventListener('openHelpMenuEvent', function(ev){ 
    let entry_id = ev.detail || "";
    helpMenuHelper.logMessage("opening helpMenu from 'openHelpMenuEvent' with 'item_id': '" + entry_id + "'")
    $scope.openHelpInNewWindow(entry_id); 
  });
}

// the simplest-case display for the help-menu when rendered directly into the page (`primo-explore/static-file/help`)
angular.module('helpMenuContentDisplay', [])
  .constant('helpMenuHelper', helpMenuHelper)
  .controller('helpMenuPopupController', ['helpMenuHelper', '$injector', '$scope', '$timeout', '$mdDialog', mainHelpMenuController])
  .component('prmExploreFooterAfter', {
    template: `
      <help-menu-content-display>
        <div ng-if="${window.location.pathname.includes("/static-file/help")}">${helpMenuContentDisplayTemplate}</div>
      </help-menu-content-display>`,
    controller: 'helpMenuPopupController'
  });

// the topbar button and the dialog content it triggers
angular.module('helpMenuTopbar', ['ngMaterial'])
  
  // add the helper used by both modules (shared)
  .constant('helpMenuHelper', helpMenuHelper)

  // add the controller for the dialog once its open (shared)
  .controller('helpMenuDialogController', ['helpMenuHelper', '$injector', '$scope', '$timeout', '$mdDialog', mainHelpMenuController])
  
  // add a controller for the icon in the top right
  .controller('helpMenuTopbarController', ['helpMenuHelper', '$injector', '$mdDialog',
    function(helpMenuHelper, $injector, $mdDialog){
      // look for the optional 'helpMenuConfig' if present
      let config = {}
      if($injector.has(optionalConfigName)){ config = $injector.get(optionalConfigName); }
      if($injector.has(optionalStudioName)){ config = $injector.get(optionalStudioName); }
      helpMenuHelper.override_with_config(config);

      // open the dialog when the button in the top right is pressed
      this.openHelpMenu = function(ev){
        helpMenuHelper.logHelpEvent("open-dialog", window.location.pathname);
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

  // add the actual icon in the top right and hook the controller to it
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
