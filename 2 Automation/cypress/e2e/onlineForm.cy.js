describe('Technical Test Freelancer QA - Automation Online Form Tests', () => {
    beforeEach(() => {
        cy.visit('https://forms.office.com/pages/responsepage.aspx?id=is2XW8LLaEmfFhLKD9VwE9lpKmxdveNGmMWKETZvAWNUMzhBV1lYTlc1SDNRS00xRVg4OFhPODlQTS4u')
    })

    it('TC01 - Verify that the online form can be accessed', () => {
        cy.get('[data-automation-id="formTitle"]').should('contain', 'Review our product')
    })

    it('TC02 - Verify that all the required fields are marked with * against the field', () => {
        cy.get('[data-automation-id="questionTitle"]').each(($field) => {
            if ($field.find('[data-automation-id="requiredStar"]').length > 0) {
                cy.wrap($field).find('[data-automation-id="requiredStar"]').should('exist')
            }
        })
    })

    it('TC03 - Verify that the required fields on the form cannot be empty when submitting', () => {
        cy.get('[data-automation-id="submitButton"]').click()
        cy.get('[data-automation-id="submitError"]').scrollIntoView().should('contain','question(s) need to be completed before submitting')
    })

    it('TC04 - Verify that the field should not be filled with only blank spaces', () => {
        cy.get('[data-automation-id="textInput"]').eq(0).type('   ')
        cy.get('[data-automation-id="textInput"]').eq(1).type('   ')
        cy.get('[data-automation-id="textInput"]').eq(2).type('   ')
        cy.get('[aria-label="5 Star"]').click()
        cy.get('[data-automation-id="dateContainer"]').click()
        const today = require('dayjs')
        cy.get('[data-automation-id="dateContainer"]').type(today().format('M/D/YYYY'))
        cy.get('[data-automation-id="submitButton"]').click()
        cy.get('[data-automation-id="submitErrorBlankSpaceField"]').scrollIntoView().should('contain', 'field tidak boleh diisi hanya dengan spasi')
    })

    it('TC05 - Verify that the phone number field can only be filled with numbers', () => {
        cy.get('[data-automation-id="textInput"]').eq(0).type('John Doe')
        cy.get('[data-automation-id="textInput"]').eq(1).type('ABCDEFGH')
        cy.get('[data-automation-id="radio"]').eq(0).click()
        cy.get('[aria-label="5 Star"]').click()
        cy.get('[data-automation-id="dateContainer"]').click()
        const today = require('dayjs')
        cy.get('[data-automation-id="dateContainer"]').type(today().format('M/D/YYYY'))
        cy.get('[data-automation-id="submitButton"]').click()
        cy.get('[data-automation-id="submitErrorPhoneNumber"]').scrollIntoView().should('contain', 'Phone Number Hanya bisa diisi oleh Number')
    })

    it('TC06 - Verify that the default option field is unselect', () => {
        cy.get('[role="radio"]').each(($radioButton) => {
            cy.wrap($radioButton).should('have.attr', 'aria-checked', 'false')
        })
    })

    it('TC07 - Verify that the review date cannot exceed today date', () => {
        cy.get('[data-automation-id="textInput"]').eq(0).type('John Doe')
        cy.get('[data-automation-id="textInput"]').eq(1).type('628999999')
        cy.get('[data-automation-id="radio"]').eq(0).click()
        cy.get('[aria-label="5 Star"]').click()
        cy.get('[data-automation-id="dateContainer"]').click()
        const today = require('dayjs')
        const tomorrow = today().add(1, 'day')
        cy.get('[data-automation-id="dateContainer"]').type(tomorrow.format('M/D/YYYY'))
        cy.get('[data-automation-id="submitButton"]').click()
        cy.get('[data-automation-id="submitErrorReviewDateExceedTodayDate"]').scrollIntoView().should('contain', 'Tangal pada Review Date tidak boleh melebihi tanggal hari ini')
    })

    it('TC08 - Verify that the user has successfully filled out and submitted the form', () => {
        cy.get('[data-automation-id="textInput"]').eq(0).type('John Doe')
        cy.get('[data-automation-id="textInput"]').eq(1).type('628999999')
        cy.get('[data-automation-id="radio"]').eq(0).click()
        cy.get('[aria-label="5 Star"]').click()
        cy.get('[data-automation-id="dateContainer"]').click()
        const today = require('dayjs')
        cy.get('[data-automation-id="dateContainer"]').type(today().format('M/D/YYYY'))
        cy.get('[data-automation-id="submitButton"]').click()
        cy.get('[data-automation-id="thankYouMessage"]').should('be.visible')
    })
})