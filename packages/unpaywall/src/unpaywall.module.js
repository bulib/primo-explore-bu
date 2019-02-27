let logUnpaywallMessageToConsole = function(message, logToConsole=true){
  if(logToConsole){ console.log("bulib-unpaywall) " + message); }
}

let logUnpaywallEventToAnalytics = function(category, action, label, logToConsole=true, publishEvent=false){
  logUnpaywallMessageToConsole("sending '" + category + "' event sent to Google Analytics [publish=" + publishEvent + "].", logToConsole);
  if(publishEvent){ window.ga('send', 'event', category, action, label); }
}

angular.module('bulibUnpaywall', []).component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    template: `
      <bulib-unpaywall ng-if="$ctrl.show">
        <div layout="flex" ng-if="$ctrl.best_oa_link" class="layout-row" style="margin-top: 5px;">
          <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_lock_open_24px" style="color: #f68212;"></prm-icon>
          <a ng-click="$ctrl.trackLinkClick($ctrl.doi)" target="_blank" href="{{$ctrl.best_oa_link}}"
             style="margin-left: 3px; margin-top: 3px;" rel="noreferrer">
             <strong>Open Access</strong> available via unpaywall
             <span ng-if="$ctrl.showVersionLabel && $ctrl.best_oa_version">&nbsp({{$ctrl.best_oa_version}} version)</span>
             <prm-icon external-link icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></prm-icon>
          </a>
        </div>
        <div ng-if="$ctrl.showDebugTable" class="layout-row">
          <table>
            <tr><td><strong>doi</strong></td><td>{{$ctrl.doi}}</td></tr>
            <tr><td><strong>is_OA</strong></td><td>{{$ctrl.is_oa}}</td>
            <tr><td><strong>best_oa_link</strong></td><td>{{$ctrl.best_oa_link}}</td></tr>
            <tr><td><strong>best_oa_version</strong></td><td>{{$ctrl.best_oa_version}}</td></tr>
          </table>
        </div>
      </bulib-unpaywall>`,
    controller: function(unpaywallConfig, $http) {
      var self = this;  // 'this' changes scope inside of the $http.get(). 'self' is easier to track/trace
      var item = this.parentCtrl.result;  // item data is stored in 'prmSearchResultAvailability' (its parent)
      
      // obtain contextual info on whether you're on the result list of the full item view
      var onFullView = this.parentCtrl.isFullView || this.parentCtrl.isOverlayFullView;
      self.listOrFullViewLabel = onFullView ? 'full' : 'list';
      self.show = onFullView || unpaywallConfig.showOnResultsPage;

      // obtain custom configuration information from 'unpaywallConfig' constant (with defaults)
      self.showDebugTable = unpaywallConfig.showDebugTable || false;
      self.logToConsole = unpaywallConfig.logToConsole || false;
      self.showVersionLabel = unpaywallConfig.showVersionLabel || false;
      self.publishEvents = unpaywallConfig.publishEvents || false;
      self.logEvent = unpaywallConfig.logEvent || logUnpaywallEventToAnalytics;
      
      // ng-click response that logs data to google analytics
      self.trackLinkClick = function(doi){
        logUnpaywallMessageToConsole("unpaywall link used for doi: "+doi, self.logToConsole);
        self.logEvent("unpaywall", "usage", self.listOrFullViewLabel, self.logToConsole, self.publishEvents);
      };

      try{
        // obtain doi and open access information from the item PNX (metadata)
        var addata = item.pnx.addata;
        if(addata){
          this.doi = addata.hasOwnProperty("doi")? addata.doi[0] : null; //default to first doi (list)
          this.is_oa = addata.hasOwnProperty("oa"); //true if property is present at all (regardless of value)
        }

        // if there's a doi and it's not already open access, ask the oadoi.org for an OA link
        if(this.doi && !this.is_oa && self.show){
          self.logEvent('unpaywall', 'api-call', self.listOrFullViewLabel, self.logToConsole, self.publishEvents);

          // make the actual call to unpaywall API
          $http.get("https://api.oadoi.org/v2/"+self.doi+"?email="+unpaywallConfig.email).then(
            function(successResponse){
              // if there is a "best open access location", save it so it can be used in the template above
              var best_oa_location = successResponse.data.best_oa_location;
              if(!best_oa_location){
                return; // can't get what we want from unpaywall. returning with nothing
              }

              // get the "best" content link from this "best_oa_location"
              self.best_oa_link = best_oa_location.url || "";
              logUnpaywallMessageToConsole("successfully acquired a 'best_oa_location' for doi '" + self.doi + "' at url: " + self.best_oa_link, self.logToConsole);
              self.logEvent('unpaywall', 'api-success', self.listOrFullViewLabel, self.logToConsole, self.publishEvents);

              // optionally display whether the link is to a published, submitted, or accepted version
              var best_oa_version = best_oa_location.version.toLowerCase() || "";
              if(best_oa_version.includes("publish")){
                self.best_oa_version = "";  // users should assume it's the 'published' version without it being clarified in the UI
              }else{
                self.best_oa_version = (best_oa_version.includes("submit"))? "Submitted" : "Accepted";
              }
            }, function(errorResponse){
              logUnpaywallMessageToConsole("[" + errorResponse.status + "] error calling unpaywall API: " +  errorResponse.statusText, self.logToConsole);
            });
        }

      }catch(e){
        logUnpaywallMessageToConsole("error caught in unpaywallController: " + e.message);
      }
    }
  });
