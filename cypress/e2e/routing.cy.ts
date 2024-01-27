describe('app works correctly with routes', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  it('main', function() {
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('string', function() {
    cy.get('[class*=main-page_card]').as('cards');
	cy.get('@cards').find('[class*=main-page_string]').as('stringButton');
    cy.get('@stringButton').click();
	cy.contains('Строка');
  });
  
   it('fibonacci', function() {
    cy.get('[class*=main-page_card]').as('cards');
	cy.get('@cards').find('[class*=main-page_fibonacci]').as('fibonacciButton');
    cy.get('@fibonacciButton').click();
	cy.contains('Последовательность Фибоначчи');
  });
  
   it('sorting', function() {
    cy.get('[class*=main-page_card]').as('cards');
	cy.get('@cards').find('[class*=main-page_arr]').as('sortingButton');
    cy.get('@sortingButton').click();
	cy.contains('Сортировка массива');
  });
  
    it('stack', function() {
    cy.get('[class*=main-page_card]').as('cards');
	cy.get('@cards').find('[class*=main-page_stack]').as('stackButton');
    cy.get('@stackButton').click();
	cy.contains('Стек');
  });
  
   it('queue', function() {
    cy.get('[class*=main-page_card]').as('cards');
	cy.get('@cards').find('[class*=main-page_queue]').as('queueButton');
    cy.get('@queueButton').click();
	cy.contains('Очередь');
  });
  
   it('list', function() {
    cy.get('[class*=main-page_card]').as('cards');
	cy.get('@cards').find('[class*=main-page_list]').as('listButton');
    cy.get('@listButton').click();
	cy.contains('Связный список');
  });
}); 