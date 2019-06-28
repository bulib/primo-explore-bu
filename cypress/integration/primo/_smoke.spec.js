describe('Server is Running Successfully', function () {
  beforeEach(() => {
    cy.visit('/primo-explore/search?vid=default&lang=en_US')
  })

  it('<primo-explore> tag appears on the page', function () {
    cy.get('primo-explore')
  })
})