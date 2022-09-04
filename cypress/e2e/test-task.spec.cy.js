/// <reference types="cypress" />

describe('empty spec', () => {
  const email = 'test@test.com'
  const title = 'Брайан Трейси Достижение максимума'
  beforeEach(() => {
    cy.visit('/')
  })
  it('checking the page display', () => {
    cy.login()
    cy.get('.text-light > .ml-2').should('be.visible')
    cy.get('.pt-2').should('contain', email)
  })
  it('Checking adding a book', () => {
    cy.login()
    cy.get('.p-0 > .btn').click()
    cy.get('.modal-title').should('be.visible')
    cy.fixture('books').then((book) => {
      cy.get('#title').type(book.item[0])
      cy.get('#description').type(book.item[1])
      cy.get('#authors').type(book.item[2])
    }) 
    cy.get('#fileCover').selectFile('cypress/image/brain-max.webp')
    cy.get('#fileBook').selectFile('cypress/files/Брайан Трейси Достижение максимума.pdf')
    cy.get('form > .ml-2').click()
    cy.get('a:nth-child(1) .card-title').should('have.text', title)
  })
  it('Checking adding a book to favorites', () => {
    cy.login()
    cy.get('a:nth-child(1)').should('be.visible')
    cy.get('a:nth-child(1) .btn').should('have.text', 'Add to favorite').click()
    cy.get('a:nth-child(1) .btn').should('have.text', 'Delete from favorite')
  })
  it('Checking the deletion of a book', () => {
    cy.login()
    cy.get('h4').click()
    cy.get('a:nth-child(1)').should('be.visible')
    cy.get('a:nth-child(1) .btn').should('have.text', 'Delete from favorite').click()
    cy.get('.text-light > .ml-2').click()    
    cy.get('a:nth-child(1) .btn').should('have.text', 'Add to favorite')
  })
})