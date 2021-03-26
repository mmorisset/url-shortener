describe('Shortened URL index', function() {
  beforeEach(() => {
    cy.app('clean') // have a look at cypress/app_commands/clean.rb
  })

  it('Successfully create a shortened URL', function() {
    const URL = 'https://fr.wikipedia.org/wiki/Arctic_Monkeys';
    cy.visit('/');
    cy.get('.shortened_url_original_url').type(URL)
    cy.get('.action-shorten-url').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/shortened_urls/1');
    });
    cy.get('.details').contains(URL);
  })
})
