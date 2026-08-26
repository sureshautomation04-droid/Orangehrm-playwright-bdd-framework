Feature: Login Functionality

Scenario: Successful Login

Given user is on login page
When user enter valid username and password
And user click on login button
Then user should be navigated to dashboard page