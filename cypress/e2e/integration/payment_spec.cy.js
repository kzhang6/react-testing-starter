describe("payment", () => {
  it("user can make payment", () => {
    cy.visit("localhost:3000", { timeout: 30000 });
  });
});
