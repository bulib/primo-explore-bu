var logEventToAnalytics = function(category, action, label){
  if(window.ga){ window.ga('send', 'event', category, action, label); }
}

var outboundLinksHelper = {
  logToConsole: false,
  publishEvents: true,
  logOutboundLinkMessage: function(message){
    if(this.logToConsole){ console.log("bulib-outbound-links) " + message); }
  },
  logOutboundLinkEvent: function(category, action, urlClicked){
    this.logOutboundLinkMessage(
      "logging '" + category + "' event with action: '" + action + "', label:'" + urlClicked + "' [publish="+ this.publishEvents + "]."
    );

    if(this.publishEvents){
      this.logEvent(category, action, urlClicked, this.debug);
    }
  },
  getHrefArgFromSearch: function(hrefArgs, key, fallback){
    // default parameters
    if(!key){ key="docid="; }
    if(!fallback){ fallback="[unknown]"; }

    // grab argument values
    var source = fallback;
    if(hrefArgs && key && hrefArgs.includes(key)){
      var start_index = hrefArgs.indexOf(key) + key.length;
      var end_index = hrefArgs.indexOf("&", start_index);
      if(end_index == "-1"){ end_index = hrefArgs.length; }
      source = hrefArgs.substring(start_index, end_index);
    }
    return source;
  },
  addEventListenersForOutboundLinkType: function(linksList, eventCode){
    var section_name = (eventCode == "link-to-resource") ? 'Find/View Online' : "More Links";
    if(linksList && linksList.length > 0){
      outboundLinksHelper.logOutboundLinkMessage("adding eventListeners to " + linksList.length + " '" + section_name + "' anchor tag/s...");
      for(var i=0; i<linksList.length; i++){
        var anchorLinkElem = linksList[i];
          
        // get the url (and use the referring if it's an ezproxy link)
        var url = anchorLinkElem.getAttribute("href");
        var loggedURL = this.getHrefArgFromSearch(url, "url=", url);

        // determine what to log as the 'action' part of the event
        var action = (eventCode == "link-to-resource")
          ? this.getHrefArgFromSearch(window.location.search, "docid=") // where the link is coming from (e.g. libguides, openBU) from the primo 'docid' value
          : anchorLinkElem.querySelector("span").innerHTML   // the text of the link
        ;

        // add the EventListener to that anchor tag
        var self = this; 
        anchorLinkElem.addEventListener("click", function(event){
          event.preventDefault();
          self.logOutboundLinkEvent(eventCode, action, loggedURL);
          window.open(url, '_blank');
        });
      }
    }else{
      this.logOutboundLinkMessage("no '" + eventCode + "' links found in '" + section_name + "'.");
    }
  }
};

angular.module('outboundLinksLogger', [])
  .constant('outboundLinksHelper', outboundLinksHelper)
  .controller('outboundLinksController', ['outboundLinksHelper', '$timeout', '$injector',
    function(outboundLinksHelper, $timeout, $injector){
      
      // update behavior configurations if a config constant is found
      var config = $injector.has('outboundLinksConfig')? $injector.get('outboundLinksConfig') : {};
      outboundLinksHelper.logToConsole = Object.keys(config).includes('logToConsole')? config.logToConsole : true; 
      outboundLinksHelper.publishEvents = Object.keys(config).includes('publishEvents')? config.publishEvents : true;
      outboundLinksHelper.logEvent = config.logEvent || logEventToAnalytics;

      // add eventListeners to the appropriate links after waiting a bit for primo to add them to the page
      var anchorLinkElements;
      $timeout(function(){
        anchorLinkElements = document.querySelectorAll("prm-service-links > div > div > a.arrow-link");
        outboundLinksHelper.addEventListenersForOutboundLinkType(anchorLinkElements, "outbound-links");
      }, 1500);
      $timeout(function(){
        anchorLinkElements = document.querySelectorAll("prm-view-online > div > a");
        outboundLinksHelper.addEventListenersForOutboundLinkType(anchorLinkElements, "link-to-resource");
      }, 2500);
    }
  ])
  .component('prmFullViewAfter', { controller: 'outboundLinksController' });
