angular.module('bulibUnpaywall', [])
  .controller('unpaywallController', ['$http', '$injector',
    function($http, $injector) {
      var self = this;  // 'this' changes scope inside of the $http.get(). 'self' is easier to track/trace

      var LOG_CONFIG_DISCOVERY = false;

      var logEventToGoogleAnalytics = function(category, action, label){
        if(window.ga){ window.ga('send', 'event', category, action, label); }
      }

      // obtain custom configuration information from 'unpaywallConfig' or primo-studio constant
      var unpaywallConfig = {};
      if ($injector.modules && LOG_CONFIG_DISCOVERY) {
        console.log($injector.modules);
      }
      if ($injector.has('unpaywallConfig')) {
        if (LOG_CONFIG_DISCOVERY) { console.log("'unpaywallConfig' found: "); }
        unpaywallConfig = $injector.get('unpaywallConfig');
      }
      if ($injector.has('primoExploreUnpaywallStudioConfig')) {
        if (LOG_CONFIG_DISCOVERY) { console.log("'primoExploreUnpaywallStudioConfig' found: "); }
        unpaywallConfig = $injector.get('primoExploreUnpaywallStudioConfig');
      }
      if (LOG_CONFIG_DISCOVERY) { console.log(unpaywallConfig); }

      // provide 'unpaywall' organization with default value including some context that it's from us (for rate-limiting)
      self.email = unpaywallConfig.email || "primo-explore-unpaywall@npmjs.com";

      // provide additional customization options (with defaults)
      self.logToConsole = (Object.keys(unpaywallConfig).includes("logToConsole")) ? unpaywallConfig.logToConsole : true;
      self.publishEvents = (Object.keys(unpaywallConfig).includes("publishEvents")) ? unpaywallConfig.publishEvents : false;
      self.showVersionLabel = (Object.keys(unpaywallConfig).includes("showVersionLabel")) ? unpaywallConfig.showVersionLabel : false;
      self.showDebugTable = (Object.keys(unpaywallConfig).includes("showDebugTable")) ? unpaywallConfig.showDebugTable : false;
      self.showOnResultsPage = (Object.keys(unpaywallConfig).includes("showOnResultsPage")) ? unpaywallConfig.showOnResultsPage : true;
      self.overrideOACheck = (Object.keys(unpaywallConfig).includes("overrideOACheck")) ? unpaywallConfig.overrideOACheck : false;
      self.logEvent = unpaywallConfig.logEvent || logEventToGoogleAnalytics;

      // customize UI/UX
      self.labelText = (Object.keys(unpaywallConfig).includes("labelText")) ? unpaywallConfig.labelText : null;
      self.imageUrl  = (Object.keys(unpaywallConfig).includes("imageUrl")) ? unpaywallConfig.imageUrl : null;
      self.imageStyle = (Object.keys(unpaywallConfig).includes("imageStyle")) ? unpaywallConfig.imageStyle : "height: 24px; vertical-align: bottom; padding-right: 5px;";
      
      // conditionally log to the console
      self.logMessageToConsole = function (message) {
        if (self.logToConsole) { console.log("bulib-unpaywall) " + message); }
      }

      // conditionally call customized 'logEvent'
      self.logEventToAnalytics = function (category, action, label) {
        self.logMessageToConsole("triggering '" + category + "." + action + "' event [publish=" + self.publishEvents + "].");
        if (self.publishEvents) { self.logEvent(category, action, label); }
      }

      // ng-click response that logs data to google analytics
      self.trackLinkClick = function (doi) {
        self.logMessageToConsole("unpaywall link used for doi: " + doi);
        self.logEventToAnalytics("unpaywall", "usage", self.listOrFullViewLabel);
      };

      self.$postLink = function(){
        self.parentCtrl = self.prmSearchResultAvailabilityLine
        var item = self.parentCtrl.result;  // item data is stored in 'prmSearchResultAvailability' (its parent)

        // obtain contextual info on whether you're on the result list of the full item view
        var onFullView = this.parentCtrl.isFullView || this.parentCtrl.isOverlayFullView;
        self.listOrFullViewLabel = onFullView ? 'full' : 'list';
        self.show = onFullView || self.showOnResultsPage;

        try {
          // obtain doi and open access information from the item PNX (metadata)
          var addata = item.pnx.addata;
          if (addata) {
            this.doi = addata.hasOwnProperty("doi") ? addata.doi[0] : null; //default to first doi (list)
            this.is_oa = addata.hasOwnProperty("oa"); //true if property is present at all (regardless of value)
          }

          // if there's a doi and it's not already open access, ask the oadoi.org for an OA link
          if (this.doi && (!this.is_oa || self.overrideOACheck) && self.show) {
            self.logEventToAnalytics('unpaywall', 'api-call', self.listOrFullViewLabel);

            // make the actual call to unpaywall API
            var apiUrl = "https://api.oadoi.org/v2/" + self.doi + "?email=" + self.email;
            self.logMessageToConsole("-> making 'api-call' to " + apiUrl);
            $http.get(encodeURI(apiUrl)).then(
              function (successResponse) {
                // if there is a "best open access location", save it so it can be used in the template above
                var best_oa_location = successResponse.data.best_oa_location;
                if (!best_oa_location) {
                  return; // can't get what we want from unpaywall. returning with nothing
                }

                // get the "best" content link from this "best_oa_location"
                self.best_oa_link = best_oa_location.url || "";
                self.logMessageToConsole("successfully acquired a 'best_oa_location' for doi '" + self.doi + "' at url: " + self.best_oa_link);
                self.logEventToAnalytics('unpaywall', 'api-success', self.listOrFullViewLabel);

                // optionally display whether the link is to a published, submitted, or accepted version
                var best_oa_version = best_oa_location.version.toLowerCase() || "";
                if (best_oa_version.includes("publish")) {
                  self.best_oa_version = "";  // users should assume it's the 'published' version without it being clarified in the UI
                } else {
                  self.best_oa_version = (best_oa_version.includes("submit")) ? "Submitted" : "Accepted";
                }
              }, function (errorResponse) {
                self.logMessageToConsole("[error status: " + errorResponse.status + "] error calling unpaywall API: " + errorResponse.statusText);
              }
            );
          }

        } catch (e) {
          self.logMessageToConsole("error caught in unpaywallController: " + e.message);
        }
      }

    }
  ])
  .component('bulibUnpaywall', {
    require: {
      prmSearchResultAvailabilityLine: '^prmSearchResultAvailabilityLine'
    },
    template: '\
      <unpaywall ng-if="$ctrl.show">\
        <div layout="flex" ng-if="$ctrl.best_oa_link" class="layout-row" style="margin-top: 5px;">\
          <a ng-click="$ctrl.trackLinkClick($ctrl.doi)" target="_blank" href="{{$ctrl.best_oa_link}}"\
            style="margin-left: 3px; margin-top: 3px;" rel="noreferrer">\
            \
            <img ng-if="$ctrl.imageUrl" src="{{$ctrl.imageUrl}}" alt="unpaywall logo" style="{{$ctrl.imageStyle}}">\
            <prm-icon ng-hide="$ctrl.imageUrl" icon-type="svg" svg-icon-set="action" icon-definition="ic_lock_open_24px" style="color: #f68212;"></prm-icon>\
            \
            <span ng-if="$ctrl.labelText">{{$ctrl.labelText}}</span>\
            <span ng-hide="$ctrl.labelText"><strong>Open Access</strong> available via unpaywall</span>\
            \
            <span ng-if="$ctrl.showVersionLabel && $ctrl.best_oa_version">&nbsp({{$ctrl.best_oa_version}} version)</span>\
            <prm-icon external-link icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></prm-icon>\
          </a>\
        </div>\
        <div ng-if="$ctrl.showDebugTable" class="layout-row">\
          <table>\
            <tr><td><strong>doi</strong></td><td>{{$ctrl.doi}}</td></tr>\
            <tr><td><strong>is_OA</strong></td><td>{{$ctrl.is_oa}}</td>\
            <tr><td><strong>best_oa_link</strong></td><td>{{$ctrl.best_oa_link}}</td></tr>\
            <tr><td><strong>best_oa_version</strong></td><td>{{$ctrl.best_oa_version}}</td></tr>\
          </table>\
        </div>\
      </unpaywall>',
    controller: 'unpaywallController'
  });