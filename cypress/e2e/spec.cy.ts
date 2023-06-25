describe('Tests first page', () => {
  it('passes', () => {
    cy.visit('https://xadrez-es2.vercel.app/')
    cy.get('h1').should('contain', 'Xadrez - Engenharia de Software II');
    cy.get('button[value="easy"]').should('have.class', 'selected');
    cy.get('button[value="medium"]').click();
    cy.get('button[value="medium"]').should('have.class', 'selected');
    cy.get('button[value="easy"]').should('not.have.class', 'selected');
    cy.get('button[value="human-computer"]').should('have.class', 'selected');
    cy.get('.start').click();
  })
});
