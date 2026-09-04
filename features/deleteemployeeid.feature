Feature: Delete Employee By Employee ID

  Scenario: Delete Employee By Employee ID
    Given user is logged into OrangeHRM application
    When user searches employee using employee id
    And user deletes the employee
    Then employee should be deleted successfully
    When user searches employee using employee id again
    Then employee should not be displayed in search result
