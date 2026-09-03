import { Locator, Page } from "@playwright/test";
import { EmployePage } from "./EmployeePage";

export class EditDriverLicensePage extends EmployePage {
    private readonly editEmployeeIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.editEmployeeIcon = page.locator('.oxd-icon-button:has(.bi-pencil-fill)').first();
    }

    async clickEditEmployee(): Promise<void> {
        await this.waitForElement(this.editEmployeeIcon);
        await this.click(this.editEmployeeIcon);
    }

    async clearAndUpdateDriverLicense(driverlicense: string): Promise<void> {
        await this.waitForElement(this.driverLicenseTextbox);
        await this.clear(this.driverLicenseTextbox);
        await this.type(this.driverLicenseTextbox, driverlicense);
        // Must save — otherwise no "Successfully Updated" toast ever appears
        await this.clickSaveButton();
    }

    async getDriverLicenseNumber(): Promise<string> {
        await this.waitForVisible(this.driverLicenseTextbox);
        await this.wait(3000);
        return this.getInputValue(this.driverLicenseTextbox);
    }

    async displayedDriverLicenseNumber(): Promise<void> {
        const actualdriverLicence: string = await this.getDriverLicenseNumber();
        await this.verifyEqual(this.driverLicenseTextbox, actualdriverLicence);
        await this.wait(3000);
    }

}
