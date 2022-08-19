const { v4: uuidv4 } = require("uuid");

describe("payment", () => {
  it("user can make payment", () => {
    cy.visit("localhost:3000", { timeout: 30000 });
    cy.findByRole("textbox", { name: /username/i }).type("johndoe"); //equivlent to getByRole in RTL
    cy.findByLabelText(/password/i).type("s3cret");
    cy.findByRole("checkbox", { name: /remember me/i }).check();
    cy.findByRole("button", { name: /sign in/i }).click();

    let oldBalance;
    cy.get("[data-test=sidenav-user-balance]").then(($balance) => (oldBalance = $balance.text()));
    // .then((balance) => console.log(balance));

    cy.findByRole("button", { name: /new/i }).click();
    cy.findByRole("textbox").type("devon becker");
    cy.findByText(/devon becker/i).click();

    const paymentAmount = "5.00";
    cy.findByPlaceholderText(/amount/i).type(paymentAmount);
    // cy.findByPlaceholderText(/add a note/i).type("dinner");
    const note = uuidv4();
    cy.findByPlaceholderText(/add a note/i).type(note);
    cy.findByRole("button", { name: /pay/i }).click();

    cy.findByRole("button", { name: /return to transactions/i }).click();
    cy.findByRole("tab", { name: /mine/i }).click();
    cy.findByText(note).click({ force: true });

    cy.findByText(`-$${paymentAmount}`).should("be.visible");
    cy.findByText(note).should("be.visible");

    cy.get("[data-test=sidenav-user-balance]").then(($balance) => {
      const convertedOldBalance = parseFloat(oldBalance.replace(/\$|,/g, ""));
      const convertedNewBalance = parseFloat($balance.text().replace(/\$|,/g, ""));
      expect(convertedOldBalance - convertedNewBalance).to.equal(parseFloat(paymentAmount));
    });
  });
});
