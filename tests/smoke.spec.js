describe("smoke tests for the overall 'primo-explore-bu' repository", function () {
  beforeEach(module("prmExploreMain"));
  beforeEach(function(){ jasmine.getJSONFixtures().fixturesPath = "base/tests/fixtures"; })

  var $componentController, $rootScope, $q, ctrl, expectedIds, bindings;

  it("should run a sample passing test", function () {
    expect(true).toBe(true);
  });

  it("should load the 'online_result' fixture", function(){
    var online_result = getJSONFixture("online_result.json");
    expect(online_result).toBeDefined();
  })

  it("should load the 'print_result' fixture", function(){
    var print_result = getJSONFixture("print_result.json");
    expect(print_result).toBeDefined();
  })
});