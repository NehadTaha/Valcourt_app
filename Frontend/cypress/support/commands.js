// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Cypress.Commands.add("deleteUser", (userId) => {
//   // Make an HTTP request to your backend API to delete the user
//   cy.request({
//     method: "DELETE",
//     url: `http://localhost:8080/userInfo/${userId}`, // Replace with your actual endpoint
//     headers: {
//       Authorization: "Bearer your_access_token", // If authentication is required
//     },
//   }).then((response) => {
//     // Check if the deletion was successful
//     expect(response.status).to.eq(200); // Adjust the status code based on your API response
//   });
// });
