describe('shortened URL creation', () => {
  beforeEach(() => {
    cy.app('clean') // have a look at cypress/app_commands/clean.rb
  })

  it('successfully create a shortened URL when the URL is valid', () => {
    const URL = 'https://fr.wikipedia.org/wiki/Arctic_Monkeys';
    cy.visit('/');
    cy.get('.shortened_url_original_url').type(URL)
    cy.get('.action-shorten-url').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/shortened_urls');
    });
    cy.get('.details').contains(URL);
    cy.get('.toastr .notice').contains('Shortened url was successfully created');
  })

  it('shows an error when no URL is given', () => {
    cy.visit('/');
    cy.get('.action-shorten-url').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/shortened_urls');
    });
    cy.get('.shortened_url_original_url .invalid-feedback').contains("Original url can't be blank");
    cy.get('.toastr .alert').contains('Shortened url could not be created');
  });

  it('shows an error when the URL given is invalid', () => {
    const URL = 'not_an_url';

    cy.visit('/');
    cy.get('.shortened_url_original_url').type(URL);
    cy.get('.action-shorten-url').click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/shortened_urls');
    });
    cy.contains(URL).should('not.exist')
    cy.get('.shortened_url_original_url .invalid-feedback').contains("Original url must be a valid URL");
    cy.get('.toastr .alert').contains('Shortened url could not be created');
  });
})
