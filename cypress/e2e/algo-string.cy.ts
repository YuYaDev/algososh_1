describe('strings', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
	cy.get('[class*=main-page_card]').as('cards');
	cy.get('@cards').find('[class*=main-page_string]').as('stringButton');
    cy.get('@stringButton').click();
  });

  it('empty input', function() {
    cy.get('[type="text"]').should('have.value', '');
	cy.get('[type="submit"]').should('be.disabled');
  });

   it('reverse', function() {
    cy.get('[type="text"]').type('123');
	cy.get('[type="submit"]').should('not.be.disabled').click();

   cy.get('ul > li').eq(0).get('[class*=circle_changing]').contains('1');
   cy.get('ul > li').eq(1).get('[class*=circle_default]').contains('2');
   cy.get('ul > li').eq(2).get('[class*=circle_changing]').contains('3');

    cy.get('ul > li').eq(0).get('[class*=circle_modified]').contains('3');
    cy.get('ul > li').eq(1).get('[class*=circle_modified]').contains('2');
    cy.get('ul > li').eq(2).get('[class*=circle_modified]').contains('1');
  });
});
