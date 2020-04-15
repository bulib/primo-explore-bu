describe("'primo-explore-unpaywall' package smoke tests", function () {
  beforeEach(module("bulibUnpaywall"));
  beforeEach(function(){ jasmine.getJSONFixtures().fixturesPath = "base/tests/fixtures"; })

  var $componentController, $http, bindings, locals, unpaywallController, prmSearchResultAvailabilityLine;
  beforeEach(
    inject(function ($injector) {
      // get/prepare helpers needed to grad/set the controller
      $componentController = $injector.get("$componentController");
      $http = $injector.get("$http");
      prmSearchResultAvailabilityLine = {};
      prmSearchResultAvailabilityLine.result = getJSONFixture("online_result.json");

      // grab the unpaywallController via [$componentController](https://docs.angularjs.org/api/ngMock/service/$componentController)
      locals = null;
      bindings = { 
        $http: $http, 
        $injector: $injector,
        prmSearchResultAvailabilityLine: prmSearchResultAvailabilityLine 
      };
      unpaywallController = $componentController('unpaywallController', locals, bindings);
    })
  );
  
  it("should run a sample passing test", function () {
    expect(true).toBe(true);
  });

  it("should effectively load the unpaywallController", function () {
    expect(unpaywallController).toBeDefined();
  });


});