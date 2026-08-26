Feature: PIM Module - Add Employee Functionality

    Scenario: Add Employee with Login Details

        Given user is logged into OrangeHRM application
        When user navigates to PIM module
        And user clicks on Add Employee button
        And user enter employee details
        And user uploads employee photo
        And user enable Create Login Details Option
        And user enter login credentials
        And user click save button
        Then employee should be add successfully
