import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { EmployePage } from "../pages/EmployeePage";
import { generateEmployeeTestData } from "../utils/TestDataGenerator";

setDefaultTimeout(60000); // Cucumber step timeout: 60 seconds

Before(async function () {
    this.browser = await chromium.launch({
        headless: false,
        args: ["--start-maximized", "--no-sandbox", "--disable-setuid-sandbox"]
    });

    this.context = await this.browser.newContext({
        viewport: null
    })

    this.page = await this.context.newPage();

    this.loginPage = new LoginPage(this.page);
    this.employeePage = new EmployePage(this.page);


    // Initialize test data
    this.testData = generateEmployeeTestData();
});

After(async function () {
    // Wait 5 seconds before closing
    await this.page.waitForTimeout(5000);

    await this.page.close();
    await this.context.close();
    await this.browser.close();
});


