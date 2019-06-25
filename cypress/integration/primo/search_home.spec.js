/* this test was copy/pasted from NYULibraries/primo-explore-views repository and originally written by @etgrieco
 * https://github.com/NYULibraries/primo-explore-views/blob/master/primo-explore-e2e-cypress/cypress/integration/CENTRAL_PACKAGE/basic-search.spec.js
 */

describe('Home Page Search', function () {
  beforeEach(() => {
    cy.visit('/primo-explore/search?vid=VIEW')
  })

  it('successfully loads', function () {
    cy.get('#searchBar')
  })

  it('allows for a basic search', () => {
    cy.get('#searchBar')
      .type('tocqueville{enter}')
    cy.url().should('include', 'tocqueville')
    cy.get(`[id^='SEARCH_RESULT_RECORDID_']`)
      .first()
      .then($el => {
        expect($el.text().length).to.be.at.least(1)
      })
  })
})