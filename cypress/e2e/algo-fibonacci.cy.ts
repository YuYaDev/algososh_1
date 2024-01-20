describe('fibonacci', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
    cy.get('[class*=main-page_card]').as('cards');
    cy.get('@cards').find('[class*=main-page_fibonacci]').as('fibonacciButton');
    cy.get('@fibonacciButton').click();
  });
  it('empty input', function() {
    cy.get('[type="number"]').should('have.value', '');
    cy.get('[type="submit"]').should('be.disabled');
  });
  it('algorithm', function() {
    cy.get('[type="number"]').type('4');
    cy.get('[type="submit"]').should('not.be.disabled').click();
    cy.wait(500)

    cy.get('ul > li').eq(0).as('firstElement')
    cy.get('@firstElement').contains('0');
    cy.get('@firstElement').find('[class*=circle_default]').contains('1');

    cy.get('ul > li').eq(1).as('secondElement')
    cy.get('@secondElement').contains('1');
    cy.get('@secondElement').find('[class*=circle_default]').contains('1');

    cy.get('ul > li').eq(2).as('thirdElement')
    cy.get('@thirdElement').contains('2');
    cy.get('@thirdElement').find('[class*=circle_default]').contains('2');

    cy.get('ul > li').eq(3).as('fourthElement')
    cy.get('@fourthElement').contains('3');
    cy.get('@fourthElement').find('[class*=circle_default]').contains('3');

    cy.get('ul > li').eq(4).as('fiftiethElement')
    cy.get('@fiftiethElement').contains('4');
    cy.get('@fiftiethElement').find('[class*=circle_default]').contains('5');
  });
})
