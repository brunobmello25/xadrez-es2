describe('Tests settings page', () => {
  it('passes', () => {
    cy.visit('https://xadrez-es2.vercel.app/');
    cy.get('h1').should('contain', 'Xadrez - Engenharia de Software II');
    cy.get('button[value="easy"]').should('have.class', 'selected');
    cy.get('button[value="medium"]').click();
    cy.get('button[value="medium"]').should('have.class', 'selected');
    cy.get('button[value="easy"]').should('not.have.class', 'selected');
    cy.get('button[value="human-computer"]').should('have.class', 'selected');
    cy.get('.start').click();
  })
});

describe('Tests select enemy piece', () => {
  it('passes', () => {
    cy.visit('https://xadrez-es2.vercel.app/');
    cy.get('.start').click();
    cy.get("img[src='images/black-queen.png']")
      .first()
      .parent()
      .click();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Não é possível selecionar uma peça inimiga");
    });
  })
});

describe('Tests select and move own piece', () => {
  it('passes', () => {
    cy.visit('https://xadrez-es2.vercel.app/');
    cy.get('.start').click();
    cy.get("div.cell[data-x='0'][data-y='6']")
      .click();
    cy.get("div.cell[data-x='0'][data-y='4'] img")
      .should("not.exist");
    cy.on("window:alert", () => {
      throw new Error("An alert was opened, but none was expected.");
    });
    cy.get("div.cell[data-x='0'][data-y='4']")
      .click();
    cy.get("div.cell[data-x='0'][data-y='4'] img")
      .should("exist");
  })
});
