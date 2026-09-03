Feature: Edit Employee personal details

    Scenario: Edit Employee personal details
        Given user is logged into OrangeHRM application
        When user searches employee using employee id
        And user clicks edit employee icon
        And user update driver license number
        And driver license should be updated successfully
        Then update driver license number should be displayed