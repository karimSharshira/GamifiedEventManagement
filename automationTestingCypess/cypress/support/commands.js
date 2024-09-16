//Create post
Cypress.Commands.add("titleInput", () => {
  cy.get("input[placeholder='Title...']")
});

Cypress.Commands.add("DescriptionInput", () => {
  cy.get("textarea[placeholder='Post...']")
});

Cypress.Commands.add("createpostBTN", () => {
  cy.get('.cpContainer button')
});

//login
Cypress.Commands.add("emailInput", () => {
  cy.get("[type='email']")
});

Cypress.Commands.add("pwInput", () => {
  cy.get('[type="password"]')
});

Cypress.Commands.add("loginBTN", () => {
  cy.get('[style="display: flex; justify-content: center; align-items: center; height: 100vh;"] > form > button')
});

Cypress.Commands.add("chatbotInput", () => {
  cy.get("[placeholder='Write your message here']")
});

Cypress.Commands.add("chatbotSend", () => {
  cy.get(".react-chatbot-kit-chat-btn-send")
});
