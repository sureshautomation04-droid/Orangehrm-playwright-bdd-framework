import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { EmployePage } from "../pages/EmployeePage";
import { SearchemployeePage } from "../pages/SearchemployeePage";
import { DeleteEmployeePage } from "../pages/DeleteemployeePage";
import { EditDriverLicensePage } from "../pages/EditdriverlicensePage";
import { generateEmployeeTestData } from "../utils/TestDataGenerator";

setDefaultTimeout(120000); // Cucumber step timeout: 120 seconds

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
    this.searchemployeePage = new SearchemployeePage(this.page);
    this.deleteemployeePage = new DeleteEmployeePage(this.page);
    this.editdriverlicensePage = new EditDriverLicensePage(this.page);


    // Initialize test data
    this.testData = generateEmployeeTestData();

    // Initialize personal data from test data
    this.personalData = this.testData.personalDetails;


    // Employee ID will be captured from UI after employee creation
    this.employeeId = "";
    
});

After(async function () {
    // Wait 5 seconds before closing
    await this.page.waitForTimeout(5000);

    await this.page.close();
    await this.context.close();
    await this.browser.close();
});


