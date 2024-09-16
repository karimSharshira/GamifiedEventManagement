class chatbot {
    firstSensorio(){
        cy.visit(data.gamifiedEventsURL)
        cy.chatbotInput().type(data.typeHi)
        cy.chatbotSend().click()
        cy.contains("Hello. Nice to meet you.").should('be.visible')
    }
    secandSensorio(){
        cy.visit(data.gamifiedEventsURL)
        cy.chatbotInput().type(data.leanEvent)
        cy.chatbotSend().click()
        cy.contains("Here's lean philosophy event details!").should('be.visible')
        cy.wait(6000)
    }
    thirdSensorio(){
        cy.visit(data.gamifiedEventsURL)
        cy.chatbotInput().type(data.espaceEvent)
        cy.chatbotSend().click()
        cy.contains("Here's Espcae event details!").should('be.visible')
        cy.wait(6000)
    }
    fourthSensorio(){
        cy.visit(data.gamifiedEventsURL)
        cy.chatbotInput().type(data.nextEvent)
        cy.chatbotSend().click()
        cy.contains("there will be more events but currently i can't tell you").should('be.visible')
    
    }
    fifthSensorio(){
        cy.visit(data.gamifiedEventsURL)
        cy.chatbotInput().type(data.organizeEvent)
        cy.chatbotSend().click()
        cy.contains("can't give you access to that put the support can contant this email:testtc500@gmail.com").should('be.visible')
    }
    lastSensorio(){
        cy.visit(data.gamifiedEventsURL)
        cy.chatbotInput().type(data.issue)
        cy.chatbotSend().click()
        cy.contains("If you need online support you can send to this email:testtc500@gmail.com and our support team will respond to you").should('be.visible')
    }
}
export default chatbot;