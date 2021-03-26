describe('shortened URL redirection to the original url', () => {
  beforeEach(() => {
    cy.app('clean')
  })

  context('when the shortened URL exist', () => {
    it('redirects to the original URL', () => {
      const URL = 'https://fr.wikipedia.org/wiki/Arctic_Monkeys';

      cy.appFactories([
        ['create', 'shortened_url', {'original_url': URL}],
      ]).then((results) => {
        const shortenedUrl = results[0];

        cy.visit(`/${shortenedUrl.token}`);
        cy.location().should((loc) => {
          expect(loc.toString()).to.eq(shortenedUrl.original_url)
        });
      });
    })
  })

  context('when the shortened URL does not exist', () => {
    it('redirects to the home page', () => {
      cy.visit('/does-not-exist');
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/');
      });
    })
  })
})
