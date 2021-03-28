describe('Last hour activity stats for a shortened URL', () => {
  beforeEach(() => {
    cy.app('clean')
  })

  describe('when there is some activity over the last hour', () => {
    it('displays the last hour activity of the shortened URL', () => {

      cy.appFactories([
        ['create', 'shortened_url_with_activity'],
      ]).then((results) => {
        const shortenedUrl = results[0];
        cy.visit(`/shortened_urls/${shortenedUrl.id}`);
        cy.get('.no-activity').should('not.exist');
      })
    })
  })

  describe('when there is no activity over the last hour', () => {
    it('displays an empty state saying that there is no activity', () => {

      cy.appFactories([
        ['create', 'shortened_url'],
      ]).then((results) => {
        const shortenedUrl = results[0];
        cy.visit(`/shortened_urls/${shortenedUrl.id}`);
        cy.get('.no-activity').should('exist');
      })
    })
  })
})
