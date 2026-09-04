import { Locator, Page } from "@playwright/test";
import { EmployePage } from "./EmployeePage";

export class EditDriverLicensePage extends EmployePage {
    private readonly editEmployeeIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.editEmployeeIcon = page.locator(".oxd-icon-button:has(.bi-pencil-fill)").first();
    }

    async clickEditEmployee(): Promise<void> {
        await this.waitForElement(this.editEmployeeIcon);
        await this.click(this.editEmployeeIcon);
    }

    async clearAndUpdateDriverLicense(driverlicense: string): Promise<void> {
        await this.wait(2000);
        await this.clear(this.driverLicenseTextbox);
        await this.wait(2000);
        await this.type(this.driverLicenseTextbox, driverlicense);
        await this.clickSaveButton();
    }

    async getDriverLicenseNumber(): Promise<string> {
        await this.waitForVisible(this.driverLicenseTextbox);
        return this.getInputValue(this.driverLicenseTextbox);
    }

    async verifyUpdatedDriverLicenseNumber(expected: string): Promise<void> {
        const actual = await this.getDriverLicenseNumber();
        await this.verifyEqual(this.driverLicenseTextbox, expected);
        // Keep for debugging if needed: console.log('actual', actual);
        void actual;
    }
}
