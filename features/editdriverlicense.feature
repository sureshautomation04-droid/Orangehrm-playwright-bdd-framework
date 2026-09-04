Feature: Edit Employee personal details

  Scenario: Edit Employee personal details
    Given user is logged into OrangeHRM application
    When user searches employee using employee id
    And user clicks edit employee icon
    And user update driver license number
    Then driver license should be updated successfully
    And update driver license number should be displayed
