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