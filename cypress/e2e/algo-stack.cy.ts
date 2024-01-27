describe('stack', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
    cy.get('[class*=main-page_card]').as('cards');
    cy.get('@cards').find('[class*=main-page_stack]').as('stackButton');
    cy.get('@stackButton').click();
  });
  it('empty input', function() {
    cy.get('[type="text"]').should('have.value', '');
    cy.get('[data-testid="addBtn"]').should('be.disabled');
  });
  it('add', function() {
    cy.get('[type="text"]').type('1');
    cy.get('[data-testid="addBtn"]').should('not.be.disabled').click();

    cy.get('ul > li').eq(0).as('firstElement')
    cy.get('@firstElement').contains('top');
    cy.get('@firstElement').contains('0');
    cy.get('@firstElement').find('[class*=circle_changing]').contains('1');
    cy.get('@firstElement').find('[class*=circle_default]').contains('1');

    cy.get('[type="text"]').type('2');
    cy.get('[data-testid="addBtn"]').should('not.be.disabled').click();

    cy.get('@firstElement').contains('top').should('not.exist')
    cy.get('ul > li').eq(1).as('secondElement')
    cy.get('@secondElement').contains('top');
    cy.get('@secondElement').contains('1');
    cy.get('@secondElement').find('[class*=circle_changing]').contains('2');
    cy.get('@secondElement').find('[class*=circle_default]').contains('2');
  });
  it('delete', function() {
    cy.get('[type="text"]').type('1');
    cy.get('[data-testid="addBtn"]').click();
    cy.get('[type="text"]').type('2');
    cy.get('[data-testid="addBtn"]').click();

    cy.get('[data-testid="deleteBtn"]').click();
    cy.get('ul > li').should('have.length', 1)
    cy.get('ul > li').eq(0).as('firstElement')
    cy.get('@firstElement').contains('top');
    cy.get('@firstElement').contains('0');
  });
  it('clear', function() {
    cy.get('[type="text"]').type('1');
    cy.get('[data-testid="addBtn"]').click();
    cy.get('[type="text"]').type('2');
    cy.get('[data-testid="addBtn"]').click();
    cy.wait(500)
    cy.get('[data-testid="removeBtn"]').click();
    cy.get('ul > li').should('have.length', 0)
  });
})
