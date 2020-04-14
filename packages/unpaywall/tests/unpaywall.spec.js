describe("'primo-explore-unpaywall' package smoke tests", function () {
  beforeEach(module("bulibUnpaywall"));
  var $componentController, $rootScope, bulibUnpaywall, prmSearchResultAvailabilityLine, bindings;

  beforeEach(inject(function ($injector) {
    $componentController = $injector.get("$componentController");
    $rootScope = $injector.get("$rootScope");
    bulibUnpaywall = $injector.get("bulibUnpaywall");
    $timeout = $injector.get("$timeout");

    prmSearchResultAvailabilityLine = {};
    prmSearchResultAvailabilityLine.result = getJSONFixture("online_result.json");
    bindings = {
      bulibUnpaywall: bulibUnpaywall,
      prmSearchResultAvailabilityLine: prmSearchResultAvailabilityLine
    };
  }));

  it("should run a sample passing test", function () {
    expect(true).toBe(true);
  });
});