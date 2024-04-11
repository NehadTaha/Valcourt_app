describe("SignUpPage", () => {
    let userId;
  beforeEach(() => {
    // Visit the SignUpPage before each test
    cy.visit("http://localhost:3000/signup");
  });

  it('displays the "S\'inscrire" heading', () => {
    // Assert that the heading "S'inscrire" is displayed
    cy.get("h1").should("contain", "S'inscrire");
  });

  it("allows user to fill out the form and submit", () => {
    // Fill out the form fields
    cy.get("#prénom").type("John");
    cy.wait(1000);
    cy.get("#nom").type("Doe");
    cy.wait(1000);
    cy.get("#municipalité").select("Canada");
    cy.wait(1000);
    cy.get("#email").type("le2125697@crc-lennox.qc.ca");
    cy.wait(1000);
    cy.get("#password").type("Fall2020!!NT");
    cy.wait(1000);
    cy.get("#confirmPassword").type("Fall2020!!NT");
    cy.wait(1000);
    //select the interests
    // Select interests
    cy.contains("Add new interest").click();

    // Assert that the dropdown menu is visible
    cy.get("#addTagsMenu").should("be.visible");

    // Select interests from the dropdown menu
    cy.get(".cDText").eq(0).click(); // Clicks the first interest in the dropdown
    cy.get(".cDText").eq(1).click(); //

    // Submit the form
    cy.get("form").submit();
    
  });

  it('redirects to login page when "cliquer ici" link is clicked', () => {
    // Click on the "cliquer ici" link
    cy.contains("cliquer ici").click();

    // Assert that the page navigates to the login page
    cy.url().should("include", "/login");
    cy.wait(10000);

    cy.get("#email").type("le2125697@crc-lennox.qc.ca");
    cy.wait(1000);
    cy.get("#password").type("Fall2020!!NT");
    cy.wait(1000);
    // Retry clicking on the "Se connecter" link until it's visible
    cy.contains("Se connecter").click({ timeout: 10000, interval: 1000 }); // Retry for up to 10 seconds, with a 1-second interval
   
  }
  );
 


    // cy.request("GET", "http://localhost:8080/userInfo") // Adjust the endpoint to fetch user details
    //   .then((response) => {
    //     userId = response.body.id; // Assuming your response includes the user ID
    //   });

    // // Call the custom command to delete the user
    // cy.deleteUser(userId);
  });
