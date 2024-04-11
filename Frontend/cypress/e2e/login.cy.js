//const cy = require("cypress");

describe("launch the app", () => {
  beforeEach(() => {
    // Run this before each test
    cy.visit("http://localhost:3000/login");
    cy.wait(10000);
  });

   it('navigates to login page when "se connecter" is clicked', () => {
     // Click on the "se connecter" link

     // Assert that the login page is displayed
     cy.get("h1").contains("Se connecter");
     cy.get("input[type='email']").should("be.visible");
     cy.get("input[type='password']").should("be.visible");
     cy.get("button").contains("Se connecter").should("be.visible");
     cy.get("a").contains("cliquer ici").should("be.visible");
     cy.get("a").contains("Oublié votre mot de passe?").should("be.visible");

   });
//    it('navigates to signup page when"cliquer ici" is clicked', () => {
//      // Click on the "se connecter" link
//      cy.get("a").contains("se connecter").click();

//      // Assert that the login page is displayed
//      cy.get("h1").contains("Se connecter");
//      cy.get("a").contains("cliquer ici").click();
//      cy.get("h1").contains("S'inscrire");

//    });
  
 });


