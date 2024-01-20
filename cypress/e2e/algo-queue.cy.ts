describe('stack', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
    cy.get('[class*=main-page_card]').as('cards');
    cy.get('@cards').find('[class*=main-page_queue]').as('queueButton');
    cy.get('@queueButton').click();
  });
  it('empty input', function() {
    cy.get('[type="text"]').should('have.value', '');
    cy.get('[data-testid="addBtn"]').should('be.disabled');
  });
  it('add', function() {
    cy.get('ul > li').eq(0).as('firstElement')
    cy.get('@firstElement').contains('0');
    cy.get('@firstElement').find('[class*=circle_default]').should('have.text',"")
    cy.get('[type="text"]').type('1');
    cy.get('[data-testid="addBtn"]').click();
    cy.get('@firstElement').find('[class*=circle_changing]').should('exist');
    cy.get('@firstElement').find('[class*=circle_default]').contains('1');
    cy.get('@firstElement').contains('head');
    cy.get('@firstElement').contains('tail');

    cy.get('ul > li').eq(1).as('secondElement')
    cy.get('@secondElement').contains('1');
    cy.get('@secondElement').find('[class*=circle_default]').should('have.text',"")
    cy.get('[type="text"]').type('2');
    cy.get('[data-testid="addBtn"]').click();
    cy.get('@secondElement').find('[class*=circle_changing]').should('exist');
    cy.get('@secondElement').find('[class*=circle_default]').contains('2');
    cy.get('@secondElement').contains('tail');

    cy.get('@firstElement').contains('head');
  });
  it('delete', function() {
    cy.get('[type="text"]').type('1');
    cy.get('[data-testid="addBtn"]').click();
    cy.get('[type="text"]').type('2');
    cy.get('[data-testid="addBtn"]').click();
    cy.get('[type="text"]').type('3');
    cy.get('[data-testid="addBtn"]').click();
    cy.wait(500);
    cy.get('[data-testid="deleteBtn"]').click();
    cy.get('ul > li').eq(0).as('firstElement')
    cy.get('@firstElement').find('[class*=circle_default]').should('have.text',"")
    cy.get('ul > li').eq(1).as('secondElement')
    cy.get('@secondElement').contains('head');
    cy.get('ul > li').eq(2).as('thirdElement')
    cy.get('@thirdElement').contains('tail');
  });
  it('clear', function() {
    cy.get('[type="text"]').type('1');
    cy.get('[data-testid="addBtn"]').click();
    cy.get('[type="text"]').type('2');
    cy.get('[data-testid="addBtn"]').click();
    cy.wait(500)
    cy.get('[data-testid="removeBtn"]').click();
    cy.get('ul > li').should('have.length', 7)
    cy.get('ul > li').eq(0).as('firstElement')
    cy.get('@firstElement').find('[class*=circle_default]').should('have.text',"")
    cy.get('ul > li').eq(0).as('secondElement')
    cy.get('@secondElement').find('[class*=circle_default]').should('have.text',"")
  });
})
