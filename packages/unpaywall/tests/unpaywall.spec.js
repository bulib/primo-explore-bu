describe("'primo-explore-unpaywall' package smoke tests", function () {
  beforeEach(module("bulibUnpaywall"));
  beforeEach(function(){ jasmine.getJSONFixtures().fixturesPath = "base/tests/fixtures"; })

  var $componentController, $rootScope, unpaywallController, prmSearchResultAvailabilityLine;
  beforeEach(inject(function ($injector) {
    $componentController = $injector.get("$componentController");
    $rootScope = $injector.get("$rootScope");

    // bulibUnpaywall = $injector.get("bulibUnpaywall");
    prmSearchResultAvailabilityLine = {};
    prmSearchResultAvailabilityLine.result = getJSONFixture("online_result.json");
    
    unpaywallController = $componentController('unpaywallController', null, 
      {prmSearchResultAvailabilityLine: prmSearchResultAvailabilityLine}
    );
  }));

  it("should run a sample passing test", function () {
    expect(true).toBe(true);
  });
});