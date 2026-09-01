import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/world";
import { ConfigManager } from "../config/ConfigManager";
import { generateEmployeeTestData, EmployeeTestData } from "../utils/TestDataGenerator";

Given('user is logged into OrangeHRM application', async function (this: CustomWorld) {

    await this.loginPage!.navigate(ConfigManager.baseURL,{
        timeout: 90000,
        waitUntil: 'commit'
    });
    // Wait for the login form to be visible
    await this.loginPage!.waitForLoginForm();
    await this.loginPage!.login(ConfigManager.username,ConfigManager.password);
    await this.loginPage!.verifyDashboardPage();
});

 When('user navigates to PIM module', async function (this: CustomWorld) {
         await this.employeePage!.clickPimLink();
});

When('user clicks on Add Employee button', async function (this: CustomWorld) {
        await this.employeePage!.clickAddEmployeeLinkOrButton();
})

When('user enter login credentials', async function (this: CustomWorld) {
     await this.employeePage!.enterEmployeeDetails(
        this.testData!.firstName,
        this.testData!.middleName,
        this.testData!.lastName
     );
     await this.employeePage!.uploadPhoto('src/data/image/employeephoto.jpeg');
     await this.employeePage!.clickLoginDetailsToggle();
     await this.employeePage!.enterLoginCredentials(
        this.testData!.username, 
        this.testData!.status, 
        this.testData!.password
    );
   
})

When('user click save button', async function (this:CustomWorld) {
    await this.employeePage!.clickSaveButton();

});

When('employee should be add successfully', async function (this:CustomWorld) {
     await this.employeePage!.getToastMessage(this.testData!.toastMessage);
})

When('Display the employee details', async function (this: CustomWorld) {
    await this.employeePage!.getDisplayedFirstname(this.testData!.firstName);
    await this.employeePage!.getDisplayedMiddlename(this.testData!.middleName);
    await this.employeePage!.getDisplayedLastname(this.testData!.lastName);
    await this.employeePage!.enterOtherId(this.personalData!.otherId);
    await this.employeePage!.getDisplayedOtherId(this.personalData!.otherId);
})