import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../pages/LoginPage";
import { ConfigManager } from "../config/ConfigManager";

let loginPage: LoginPage;
Given('user is on login page', async function () {

    loginPage = new LoginPage(this.page);
    await loginPage.navigate(ConfigManager.baseURL);
    await loginPage.waitForApp();

});

When('user enter valid username and password', async function () {

    console.log("USERNAME:", ConfigManager.username);
    console.log("PASSWORD:", ConfigManager.password);

    await loginPage.enterUsername(ConfigManager.username);
    await loginPage.enterPassword(ConfigManager.password);
});

When('user click on login button', async function () {

    await loginPage.clickLogin();
});

Then('user should be navigated to dashboard page', async function () {

    await loginPage.verifyDashboardPage();
    await loginPage.verifyURL(/dashboard/);
});