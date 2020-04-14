describe("'primo-explore-help-menu' package smoke tests", function () {
  beforeEach(module("helpMenuTopbar"));
  beforeEach(module("helpMenuContentDisplay"));
  
  var $componentController, $rootScope, helpMenuContentDisplay, helpMenuTopbar, prmSearchBookmarkFilterAfter, bindings;

  beforeEach(inject(function ($injector) {
    $componentController = $injector.get("$componentController");
    $rootScope = $injector.get("$rootScope");
    helpMenuContentDisplay = $injector.get("helpMenuContentDisplay");
    helpMenuTopbar = $injector.get("helpMenuTopbar");
    prmSearchBookmarkFilterAfter = {};
    $timeout = $injector.get("$timeout");

    bindings = { };
  }));

  it("should run a sample passing test", function () {
    expect(true).toBe(true);
  });
});