import { Given, When, Then } from "@cucumber/cucumber";
import { ConfigManager } from "../config/ConfigManager";

Given("user is on login page", async function () {
    await this.loginPage!.navigate(ConfigManager.baseURL, {
        timeout: 60000,
        waitUntil: "domcontentloaded",
    });
});

When("user enter valid username and password", async function () {
    await this.loginPage!.enterUsername(ConfigManager.username);
    await this.loginPage!.enterPassword(ConfigManager.password);
});

When("user click on login button", async function () {
    await this.loginPage!.clickLogin();
});

Then("user should be navigated to dashboard page", async function () {
    await this.loginPage!.verifyDashboardPage();
    await this.loginPage!.verifyURL(/dashboard/);
});
