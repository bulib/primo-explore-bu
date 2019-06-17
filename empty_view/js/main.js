// import packages from node_modules/
import 'primo-explore-help-menu';
import 'primo-explore-outbound-links';
import 'primo-explore-unpaywall';

// prepare app with dependencies
angular.module('viewCustom', ['angularLoad', 'bulibUnpaywall', 'helpMenuContentDisplay',  'helpMenuTopbar', 'outboundLinksLogger']);
