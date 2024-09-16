
class login {
validLogin(){
    cy.visit(data.loginURL)
    cy.emailInput().type(data.validEmail)
    cy.pwInput().type(data.pw)
    cy.loginBTN().click()
    cy.contains("Welcome Back").should('be.visible')
    cy.wait(8000)
    cy.url().should('include', 'Homepage')
}
invalidPassword(){
    cy.visit(data.loginURL)
    cy.emailInput().type(data.validEmail)
    cy.pwInput().type(data.invalidPw)
    cy.loginBTN().click()
    cy.contains("Please enter valid credentials").should('be.visible')
    cy.wait(8000)
    cy.url().should('include', 'login')
}
invalidEmail(){
    cy.visit(data.loginURL)
    cy.emailInput().type(data.invalidEmail)
    cy.pwInput().type(data.pw)
    cy.loginBTN().click()
    cy.contains("Please enter valid credentials").should('be.visible')
    cy.wait(8000)
    cy.url().should('include', 'login')
}
invalidCredentials(){
    cy.visit(data.loginURL)
    cy.emailInput().type(data.invalidEmail)
    cy.pwInput().type(data.invalidPw)
    cy.loginBTN().click()
    cy.contains("Please enter valid credentials").should('be.visible')
    cy.wait(8000)
    cy.url().should('include', 'login')
}
}
export default login;