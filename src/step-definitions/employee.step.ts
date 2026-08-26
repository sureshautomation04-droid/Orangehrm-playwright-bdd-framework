import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../pages/LoginPage";
import { EmployeePage } from "../pages/EmployeePage";
import { ConfigManager } from "../config/ConfigManager";

let loginPage: LoginPage;
let employeePage: EmployeePage;

Given("user is logged into OrangeHRM application", async function () {

    loginPage = new LoginPage(this.page);
    await loginPage.navigate(ConfigManager.baseURL);
    await loginPage.waitForApp();
    await loginPage.login(ConfigManager.username, ConfigManager.password);
    await loginPage.verifyDashboardPage();
    await loginPage.verifyURL(/dashboard/);
    employeePage = new EmployeePage(this.page)

});

When("user navigates to PIM module", async function () {
    await employeePage.clickPim();
});

When("user clicks on Add Employee button", async function () {
    await employeePage.clickAddEmployee();
    await employeePage.verifyVisibleAddEmployeePage()
});

When("user enter employee details", async function () {
    await employeePage.enterEmployeeDetails('prod', 'dev', 'test')
});

When("user uploads employee photo", async function () {
    await employeePage.uploadPhoto();
});

When("user enable Create Login Details Option", async function () {
    await employeePage.enableLoginDetails();
});

When("user enter login credentials", async function () {
    await employeePage.enterUsernameDetails('Quality', '2', '123$aBCD');
});

When("user click save button", async function () {
    await employeePage.clickSaveButton();
});

Then("employee should be add successfully", async function () {
    await employeePage.verifySaveEmployeename('prod');
});