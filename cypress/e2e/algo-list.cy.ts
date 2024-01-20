describe('list', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
    cy.get('[class*=main-page_card]').as('cards');
    cy.get('@cards').find('[class*=main-page_list]').as('listButton');
    cy.get('@listButton').click();
  });
  it('empty input', function() {
    cy.get('[data-testid="inputValue"]').should('have.value', '');
    cy.get('[data-testid="indexValue"]').should('have.value', '');
    cy.get('[data-testid="addIntoHead"]').should('be.disabled');
    cy.get('[data-testid="addIntoTail"]').should('be.disabled');
    cy.get('[data-testid="addByIndex"]').should('be.disabled');
    cy.get('[data-testid="deleteByIndex"]').should('be.disabled');
  });
  it('default list', function() {
    cy.get('ul > li').should('have.length', 4)

    cy.get('ul > li').eq(0).as('firstElement')
    cy.get('@firstElement').contains('head');
    cy.get('@firstElement').contains('0');
    cy.get('@firstElement').find('[class*=circle_default]').should('not.have.text',"")

    cy.get('ul > li').eq(1).as('secondElement')
    cy.get('@secondElement').contains('1');
    cy.get('@secondElement').find('[class*=circle_default]').should('not.have.text',"")

    cy.get('ul > li').eq(2).as('thirdElement')
    cy.get('@thirdElement').contains('2');
    cy.get('@thirdElement').find('[class*=circle_default]').should('not.have.text',"")

    cy.get('ul > li').eq(3).as('fourthElement')
    cy.get('@fourthElement').contains('tail');
    cy.get('@fourthElement').contains('3');
    cy.get('@fourthElement').find('[class*=circle_default]').should('not.have.text',"")
  });
  it('add head', function() {
    cy.get('[data-testid="inputValue"]').type('1');
    cy.get('[data-testid="addIntoHead"]').click();
    cy.get('ul > li').eq(0).as('firstElement')
    cy.get('@firstElement').find('[data-testid="topCircle"]').contains('1');
    cy.get('@firstElement').find('[data-testid="topCircle"]').find('[class*=circle_changing]').should('exist')
    cy.wait(500)
    cy.get('@firstElement').find('[class*=circle_default]').contains('1');
    cy.get('@firstElement').contains('head');
    cy.get('@firstElement').contains('0');

    cy.get('[data-testid="inputValue"]').type('2');
    cy.get('[data-testid="addIntoHead"]').click();
    cy.get('@firstElement').find('[data-testid="topCircle"]').contains('2');
    cy.get('@firstElement').find('[data-testid="topCircle"]').find('[class*=circle_changing]').should('exist')
    cy.wait(500)
    cy.get('@firstElement').find('[class*=circle_default]').contains('2');
    cy.get('@firstElement').contains('head');
    cy.get('@firstElement').contains('0');

    cy.get('ul > li').eq(1).as('secondElement')
    cy.get('@secondElement').contains('head').should('not.exist')
    cy.get('@secondElement').contains('1');
    cy.get('@secondElement').find('[class*=circle_default]').contains('1');
  });
  it('add tail', function() {
    cy.get('[data-testid="inputValue"]').type('1');
    cy.get('[data-testid="addIntoTail"]').click();
    cy.get('ul > li').last().as('lastElement')
    cy.get('@lastElement').find('[data-testid="topCircle"]').contains('1');
    cy.get('@lastElement').find('[data-testid="topCircle"]').find('[class*=circle_changing]').should('exist')
    cy.wait(500)
    cy.get('@lastElement').find('[class*=circle_default]').contains('1');
    cy.get('@lastElement').contains('tail');
    cy.get('@lastElement').contains('4');

    cy.get('[data-testid="inputValue"]').type('2');
    cy.get('[data-testid="addIntoTail"]').click();
    cy.get('@lastElement').find('[data-testid="topCircle"]').contains('2');
    cy.get('@lastElement').find('[data-testid="topCircle"]').find('[class*=circle_changing]').should('exist')
    cy.wait(500)
    cy.get('@lastElement').find('[class*=circle_default]').contains('2');
    cy.get('@lastElement').contains('tail');
    cy.get('@lastElement').contains('5');
  });
  it('add by index', function() {
    cy.get('[data-testid="inputValue"]').type('99');
    cy.get('[data-testid="indexValue"]').type('1');
    cy.get('[data-testid="addByIndex"]').click();

    cy.get('ul > li').eq(0).as('firstElement')
    cy.get('@firstElement').find('[data-testid="topCircle"]').contains('99');
    cy.get('@firstElement').find('[data-testid="topCircle"]').find('[class*=circle_changing]').should('exist')
    cy.get('@firstElement').contains('head').should('not.exist')
    cy.get('@firstElement').contains('0');
    cy.wait(100)
    cy.get('@firstElement').find('[class*=circle_changing]').should('exist')
    cy.get('@firstElement').contains('head')
    cy.get('ul > li').eq(1).as('secondElement')
    cy.get('@secondElement').find('[data-testid="topCircle"]').contains('99');
    cy.get('@secondElement').find('[data-testid="topCircle"]').find('[class*=circle_changing]').should('exist')
    cy.wait(100)
    cy.get('ul > li').should('have.length', 5)
    cy.get('@secondElement').contains('1');
    cy.get('@secondElement').find('[class*=circle_modified]').contains('99');
    cy.get('@secondElement').find('[class*=circle_default]').contains('99');
  });
  it('delete head', function() {
    cy.get('[data-testid="inputValue"]').type('1');
    cy.get('[data-testid="addIntoHead"]').click();
    cy.wait(500)
    cy.get('[data-testid="deleteFromTheHead"]').click();
    cy.get('ul > li').eq(0).as('firstElement')
    cy.get('@firstElement').find('[data-testid="bottomCircle"]').contains('1');
    cy.get('@firstElement').find('[data-testid="bottomCircle"]').find('[class*=circle_changing]').should('exist')
    cy.get('@firstElement').find('[class*=circle_default]').should('not.have.text',"");
    cy.get('@firstElement').contains('head');
    cy.get('@firstElement').contains('0');
    cy.wait(500)
    cy.get('ul > li').should('have.length', 4)
    cy.get('@firstElement').find('[class*=circle_default]').should('not.have.text',"1");
    cy.get('@firstElement').contains('head');
    cy.get('@firstElement').contains('0');
  });
  it('delete tail', function() {
    cy.get('[data-testid="inputValue"]').type('1');
    cy.get('[data-testid="addIntoTail"]').click();
    cy.wait(500)
    cy.get('[data-testid="deleteFromTheTail"]').click();
    cy.get('ul > li').last().as('lastElement')
    cy.get('@lastElement').find('[data-testid="bottomCircle"]').contains('1');
    cy.get('@lastElement').find('[data-testid="bottomCircle"]').find('[class*=circle_changing]').should('exist')
    cy.get('@lastElement').find('[class*=circle_default]').should('not.have.text',"");
    cy.wait(500)
    cy.get('ul > li').should('have.length', 4)
    cy.get('@lastElement').find('[class*=circle_default]').should('not.have.text',"1");
    cy.get('@lastElement').contains('tail');
    cy.get('@lastElement').contains('3');
  });
  it('add by index', function() {
    cy.get('[data-testid="inputValue"]').type('99');
    cy.get('[data-testid="indexValue"]').type('1');
    cy.get('[data-testid="addByIndex"]').click();
    cy.wait(500)
    cy.get('[data-testid="indexValue"]').type('1');
    cy.get('[data-testid="deleteByIndex"]').click();

    cy.get('ul > li').eq(0).as('firstElement')
    cy.get('@firstElement').find('[class*=circle_changing]').should('exist')
    cy.get('ul > li').eq(1).as('secondElement')
    cy.get('@secondElement').find('[class*=circle_default]').should('exist')
    cy.get('@secondElement').find('[class*=circle_changing]').should('exist')

    cy.get('@secondElement').find('[data-testid="bottomCircle"]').contains('99');
    cy.get('@secondElement').find('[data-testid="bottomCircle"]').find('[class*=circle_changing]').should('exist')
    cy.get('@secondElement').find('[class*=circle_changing]').should('not.have.text',"");
    cy.wait(500)
    cy.get('ul > li').should('have.length', 4)
    cy.get('@secondElement').find('[class*=circle_default]').should('not.have.text',"99");
  });
})
