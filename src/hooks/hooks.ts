import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";

setDefaultTimeout(60000); // Cucumber step timeout: 60 seconds

Before(async function () {
    this.browser = await chromium.launch({
        headless: false,
        args: ["--start-maximized"]
    });

    this.context = await this.browser.newContext({
        viewport: null
    });

    // Playwright waits up to 60 seconds for actions/locators
    this.context.setDefaultTimeout(60000);

    // Page navigation timeout: 60 seconds
    this.context.setDefaultNavigationTimeout(60000);

    this.page = await this.context.newPage();
});

After(async function () {
    // Wait 5 seconds before closing
    await this.page.waitForTimeout(5000);
    
    await this.page.close();
    await this.context.close();
    await this.browser.close();
});


