describe("'primo-explore-help-menu' package smoke tests", function () {
  beforeEach(module("helpMenuTopbar"));
  beforeEach(module("helpMenuContentDisplay"));

  var $componentController, $scope, $injector, $timeout, $mdDialog, ngMaterial, helpMenuConfig, helpMenuHelper, helpMenuContentDisplay, helpMenuTopbar;

  beforeEach(inject(function ($injector) {
    $injector = $injector;
    $componentController = $injector.get("$componentController");
    $scope = $injector.get("$rootScope");
    $timeout = $injector.get("$timeout");
    $mdDialog = $injector.get("$mdDialog");
    ngMaterial = {};

    helpMenuConfig = {};
    helpMenuHelper = $injector.get("helpMenuHelper");
  }));

  it("should run a sample passing test", function () {
    expect(true).toBe(true);
  });

  it("should effectively load the helpMenuHelper", function () {
    expect(helpMenuHelper).toBeDefined();
  });

  it("should effectively load the helpMenuContentDisplay", function () {
    bindings = {
      helpMenuHelper: helpMenuHelper,
      $injector: $injector,
      $scope: $scope,
      $timeout: $timeout,
      $mdDialog: $mdDialog
    };
    helpMenuContentDisplay = $componentController('helpMenuContentDisplay', null, bindings);
    expect(helpMenuContentDisplay).toBeDefined();
  });

  it("should effectively load the helpMenuTopBar", function () {
    bindings = { 
      ngMaterial: ngMaterial,
      helpMenuHelper: helpMenuHelper,
    };
    helpMenuTopbar = $componentController('helpMenuTopBar', null, bindings);
    expect(helpMenuTopbar).toBeDefined();
  });
});