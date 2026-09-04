import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export class DeleteEmployeePage extends BasePage {
    private readonly deleteIcon: Locator;
    private readonly confirmDeleteIcon: Locator;
    private readonly successToastDeleteMessage: Locator;
    private readonly searchResultRows: Locator;

    constructor(page: Page) {
        super(page);
        this.deleteIcon = page.locator("button.oxd-icon-button:has(i.bi-trash)").first();
        this.confirmDeleteIcon = page.getByRole("button", { name: "Yes, Delete" });
        this.successToastDeleteMessage = page.getByText("Successfully Deleted");
        this.searchResultRows = page.locator("oxd-table-card");
    }

    async clickDeleteIcon(): Promise<void> {
        await this.waitForVisible(this.deleteIcon);
        await this.click(this.deleteIcon);
    }

    async clickConfirmDelete(): Promise<void> {
        await this.waitForVisible(this.confirmDeleteIcon);
        await this.click(this.confirmDeleteIcon);
    }

    async deleteEmployeeId(): Promise<void> {
        await this.clickDeleteIcon();
        await this.clickConfirmDelete();
    }

    async deleteToastMessage(expectedMessage: string): Promise<void> {
        await this.waitForVisible(this.successToastDeleteMessage);
        await this.verifyEqual(this.successToastDeleteMessage, expectedMessage);
    }

    async isEmployeeRowResult(): Promise<boolean> {
        const count = await this.searchResultRows.count();
        return count > 0;
    }

    async isVerifyEmployeeRowCount(): Promise<void> {
        const employeeFound = await this.isEmployeeRowResult();
        await this.verifyFalsy(employeeFound);
    }
}
