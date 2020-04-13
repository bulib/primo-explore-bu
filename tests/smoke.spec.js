describe("smoke tests for the overall 'primo-explore-bu' repository", function () {
  beforeEach(module("prmExploreMain"));
  var $componentController, $rootScope, $q, ctrl, expectedIds, bindings;

  it("should run a sample passing test", function () {
    expect(true).toBe(true);
  });
});