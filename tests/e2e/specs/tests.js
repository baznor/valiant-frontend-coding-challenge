describe('Example test', () => {
  it('runs the app', () => {
    cy.visit('http://localhost:5173/')
    cy.url().should('eq', 'http://localhost:5173/')
  })

  it('loan amount input formatting', () => {
    cy.visit('http://localhost:5173/')

    // input is formatted into currency value
    cy.get('[data-cy="loan-amount"]').type('{selectall}1000')
    cy.get('[data-cy="loan-amount"]>input').should('have.value', '$1,000')

    cy.get('[data-cy="loan-amount"]').type('{selectall}10000')
    cy.get('[data-cy="loan-amount"]>input').should('have.value', '$10,000')

    cy.get('[data-cy="loan-amount"]').type('{selectall}100000')
    cy.get('[data-cy="loan-amount"]>input').should('have.value', '$100,000')

    cy.get('[data-cy="loan-amount"]').type('{selectall}1000000')
    cy.get('[data-cy="loan-amount"]>input').should('have.value', '$1,000,000')

    // // non-numeric characters are removed
    cy.get('[data-cy="loan-amount"]').type('{selectall}1000abcdefg')
    cy.get('[data-cy="loan-amount"]>input').should('have.value', '$1,000')

    cy.get('[data-cy="loan-amount"]').type('{selectall}abcdefg')
    cy.get('[data-cy="loan-amount"]>input').should('have.value', '$0')

    cy.get('[data-cy="loan-amount"]').type('{selectall}abcdefg100')
    cy.get('[data-cy="loan-amount"]>input').should('have.value', '$100')

    cy.get('[data-cy="loan-amount"]').type('{selectall}$&@@%@&@**#')
    cy.get('[data-cy="loan-amount"]>input').should('have.value', '$0')

    cy.get('[data-cy="loan-amount"]').type('{selectall}-1000')
    cy.get('[data-cy="loan-amount"]>input').should('have.value', '$1,000')

    cy.get('[data-cy="loan-amount"]').type('{selectall}1,00')
    cy.get('[data-cy="loan-amount"]>input').should('have.value', '$100')
  })

  it('loan amount input limits', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-cy="loan-amount"]').type('{selectall}100')
    cy.get('[data-cy="loan-amount"] .errorText').should('exist')
    cy.get('[data-cy="loan-amount"] .errorText').contains('$1,000')

    cy.get('[data-cy="loan-amount"]').type('{selectall}1000')
    cy.get('[data-cy="loan-amount"] .errorText').should('not.exist')

    cy.get('[data-cy="loan-amount"]').type('{selectall}90000000')
    cy.get('[data-cy="loan-amount"] .errorText').should('exist')
    cy.get('[data-cy="loan-amount"] .errorText').contains('$20,000,000')
  })

  it('loan purpose options', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-cy="loan-purpose"]').should('exist')
    cy.get('[data-cy="loan-purpose"]').should('have.value', 'general')

    cy.get('[data-cy="loan-purpose"]').select(1)
    cy.get('[data-cy="loan-purpose"]').should('have.value', 'vehicle')

    cy.get('[data-cy="loan-purpose"]').select(2)
    cy.get('[data-cy="loan-purpose"]').should('have.value', 'property')

    cy.get('[data-cy="loan-purpose"]').select(0)
    cy.get('[data-cy="loan-purpose"]').should('have.value', 'general')

    // TODO: intercept test?
  })

  it('loan period options', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-cy="loan-period"]').should('exist')
    cy.get('[data-cy="loan-period"]').should('have.value', '12')
    cy.get('[data-cy="loan-repayment"]').contains('Monthly')

    cy.get('[data-cy="loan-period"]').select(1)
    cy.get('[data-cy="loan-period"]').should('have.value', '26')
    cy.get('[data-cy="loan-repayment"]').contains('Fortnightly')

    cy.get('[data-cy="loan-period"]').select(2)
    cy.get('[data-cy="loan-period"]').should('have.value', '12')
    cy.get('[data-cy="loan-repayment"]').contains('Monthly')

    cy.get('[data-cy="loan-period"]').select(0)
    cy.get('[data-cy="loan-period"]').should('have.value', '52')
    cy.get('[data-cy="loan-repayment"]').contains('Weekly')

    // TODO: intercept test?
  })

  it('loan term options', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-cy="loan-term"]').should('exist')
    cy.get('[data-cy="loan-term"]').should('have.value', '24')

    cy.get('[data-cy="loan-term"]').select(1)
    cy.get('[data-cy="loan-term"]').should('have.value', '12')

    cy.get('[data-cy="loan-term"]').select(2)
    cy.get('[data-cy="loan-term"]').should('have.value', '24')

    cy.get('[data-cy="loan-term"]').select(3)
    cy.get('[data-cy="loan-term"]').should('have.value', '36')

    cy.get('[data-cy="loan-term"]').select(4)
    cy.get('[data-cy="loan-term"]').should('have.value', '60')

    cy.get('[data-cy="loan-term"]').select(5)
    cy.get('[data-cy="loan-term"]').should('have.value', '120')

    cy.get('[data-cy="loan-term"]').select(6)
    cy.get('[data-cy="loan-term"]').should('have.value', '240')

    cy.get('[data-cy="loan-term"]').select(0)
    cy.get('[data-cy="loan-term"]').should('have.value', '6')
  })

  it('loan repayments and totals', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[data-cy="loan-repayment"]').should('exist')
    cy.get('[data-cy="loan-total-repayment"]').should('exist')

    cy.get('[data-cy="loan-amount"]').type('{selectall}1000')
    cy.get('[data-cy="loan-period"]').select(0)
    cy.get('[data-cy="loan-purpose"]').select(0)
    cy.get('[data-cy="loan-term"]').select(0)
    cy.get('[data-cy="loan-repayment"]').contains('$38 Weekly')
    cy.get('[data-cy="loan-total-repayment"]').contains('$228 Total')

    cy.get('[data-cy="loan-amount"]').type('{selectall}10000')
    cy.get('[data-cy="loan-period"]').select(0)
    cy.get('[data-cy="loan-purpose"]').select(1)
    cy.get('[data-cy="loan-term"]').select(0)
    cy.get('[data-cy="loan-repayment"]').contains('$385 Weekly')
    cy.get('[data-cy="loan-total-repayment"]').contains('$2,310 Total')

    cy.get('[data-cy="loan-amount"]').type('{selectall}100000')
    cy.get('[data-cy="loan-period"]').select(0)
    cy.get('[data-cy="loan-purpose"]').select(0)
    cy.get('[data-cy="loan-term"]').select(1)
    cy.get('[data-cy="loan-repayment"]').contains('$1,947 Weekly')
    cy.get('[data-cy="loan-total-repayment"]').contains('$23,364 Total')

    cy.get('[data-cy="loan-amount"]').type('{selectall}1000000')
    cy.get('[data-cy="loan-period"]').select(1)
    cy.get('[data-cy="loan-purpose"]').select(0)
    cy.get('[data-cy="loan-term"]').select(0)
    cy.get('[data-cy="loan-repayment"]').contains('$77,961 Fortnightly')
    cy.get('[data-cy="loan-total-repayment"]').contains('$467,766 Total')
  })

  it('mobile test', () => {
    cy.viewport('iphone-6')
    cy.visit('http://localhost:5173/')

    cy.get('[data-cy="loan-amount"]').should('be.visible')
    cy.get('[data-cy="loan-purpose"]').should('be.visible')
    cy.get('[data-cy="loan-term"]').should('be.visible')
    cy.get('[data-cy="loan-period"]').should('be.visible')
    cy.get('[data-cy="loan-repayment"]').should('be.visible')
    cy.get('[data-cy="loan-total-repayment"]').should('be.visible')

    // No horizontal scrollbar
    cy.window().then(win => {
      const htmlWidth = Cypress.$('html')[0].scrollWidth
      const scrollBarWidth = win.innerWidth - htmlWidth
      expect(scrollBarWidth).to.be.equal(0)
    })
  })
})
