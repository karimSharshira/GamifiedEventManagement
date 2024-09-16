import environments from "../support/pageObjects/env";
import home from "../support/pageObjects/home";
import signup from "../support/pageObjects/signup";
import createPost from "../support/pageObjects/createPost";
import login from "../support/pageObjects/login";
import chatbot from "../support/pageObjects/chatbot";
const valid = new login();
const blog = new createPost();
const browse = new environments();
const homePage = new home();
const sign = new signup();
const chat = new chatbot();
describe("empty spec", () => {
  before(function () {
    cy.fixture("example").then(function (data) {
      globalThis.data = data;
    });
  });
  beforeEach(function () {
    browse.GEProduction();
    
  });
  it("[1] Create Posts Scenarios and Assertions", () => {
    valid.validLogin();
    blog.postCreation();
  });
  it("[2] Testing the login", () => {
    valid.invalidPassword();
    valid.invalidEmail();
    valid.invalidCredentials();
    valid.validLogin();

  });
  it("[3] Testing chatbot",() => {
    chat.firstSensorio();
    chat.secandSensorio();
    chat.thirdSensorio();
    chat.fourthSensorio();
    chat.fifthSensorio();
    chat.lastSensorio();
  });
 
});
