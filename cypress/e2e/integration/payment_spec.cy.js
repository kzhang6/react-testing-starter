describe("payment", () => {
  it("user can make payment", () => {
    cy.visit("localhost:3000", { timeout: 30000 });
    cy.findByRole("textbox", { name: /username/i }).type("johndoe"); //equivlent to getByRole in RTL
    cy.findByLabelText(/password/i).type("s3cret");
    cy.findByRole("checkbox", { name: /remember me/i }).check();
    cy.findByRole("button", { name: /sign in/i }).click();

    let oldBalance;
    cy.get("[data-test=sidenav-user-balance]")
      .then(($balance) => (oldBalance = $balance.text()))
      .then((balance) => console.log(balance));
  });
});
