var pattern = "12345";
var randomNumber = "";
var Description = "";
for (var i = 0; i < 5; i++) {
  randomNumber += pattern.charAt(Math.floor(Math.random() * pattern.length));
   Description = "postDescription" + randomNumber;
}
class createPost {
postCreation(){
    cy.visit(data.createPostURL)
    cy.titleInput().type(data.postTitle)
    cy.DescriptionInput().type(Description)
    cy.createpostBTN().click()
    cy.wait(5000)
    cy.contains(data.postTitle).should('be.visible')
    cy.contains(Description).should('be.visible')
}

}
export default createPost;