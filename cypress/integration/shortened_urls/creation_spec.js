describe('Creation', () => {
  beforeEach(() => {
    cy.app('clean') // have a look at cypress/app_commands/clean.rb
  })

  it('Successfully create a shortened URL when the URL is valid', () => {
    const URL = 'https://fr.wikipedia.org/wiki/Arctic_Monkeys';
    cy.visit('/');
    cy.get('.shortened_url_original_url').type(URL)
    cy.get('.action-shorten-url').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/shortened_urls/1');
    });
    cy.get('.details').contains(URL);
  })

  it('Show an error when no URL is given', () => {
    cy.visit('/');
    cy.get('.action-shorten-url').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/shortened_urls');
    });
    cy.get('.shortened_url_original_url .invalid-feedback').contains("Original url can't be blank");
  });

  it('Show an error when the URL given is invalid', () => {
    cy.visit('/');
    cy.get('.shortened_url_original_url').type('not_an_url')
    cy.get('.action-shorten-url').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/shortened_urls');
    });
    cy.get('.shortened_url_original_url .invalid-feedback').contains("Original url is not a valid URL");
  });
})
