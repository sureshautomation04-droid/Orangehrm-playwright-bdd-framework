Feature: Employee-id Search by Employee

    Scenario: Search Employee By Employee ID
        Given user is logged into OrangeHRM application
        When user searches employee using employee id
        Then employee record should be displayed in search results