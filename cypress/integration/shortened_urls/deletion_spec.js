describe('shortened URL deletion', () => {
  beforeEach(() => {
    cy.app('clean')
  })

  describe('deletion from shortened URL index page', () => {
    it('successfully deletes the shortened URL', () => {

      cy.appFactories([
        ['create', 'shortened_url'],
      ]).then((results) => {
        const shortenedUrl = results[0];
        cy.visit('/');
        cy.get(`[data-shortened-url-id="${shortenedUrl.id}"].action-delete`).click();
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/shortened_urls');
        });
        cy.contains(shortenedUrl.original_url).should('not.exist')
        cy.get('.toastr .notice').contains('Shortened url was successfully destroyed');
      });
    })
  })

  describe('deletion from shortened URL show page', () => {
    it('successfully deletes the shortened URL', () => {

      cy.appFactories([
        ['create', 'shortened_url'],
      ]).then((results) => {
        const shortenedUrl = results[0];
        cy.visit(`/shortened_urls/${shortenedUrl.id}`);
        cy.get('.action-delete').click();
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/shortened_urls');
        });
        cy.contains(shortenedUrl.original_url).should('not.exist')
        cy.get('.toastr .notice').contains('Shortened url was successfully destroyed');
      });
    })
  })
})
