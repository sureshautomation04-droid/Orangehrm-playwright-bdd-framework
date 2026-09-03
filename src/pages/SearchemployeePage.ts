import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export class SearchemployeePage extends BasePage {

    private readonly searchEmployeeId: Locator;
    private readonly searchButton: Locator;
    private readonly searchResultEmployeeId: Locator;

    constructor(page: Page) {
        super(page);
        
        this.searchEmployeeId = page.getByText('Employee Id', { exact: true }).locator('..').locator('..').getByRole('textbox');
        this.searchButton = page.getByRole("button", { name: "Search" });
        this.searchResultEmployeeId = page.locator('.oxd-table-cell').nth(1)

    }

    async enterEmployeeIdforSearch(employeeId: string): Promise<void> {
        await this.waitForElement(this.searchEmployeeId);
        await this.fill(this.searchEmployeeId, employeeId);
        await this.waitForElement(this.searchButton);
        await this.click(this.searchButton);
    }

    async getSearchResultEmployeeId(expectedText: string): Promise<void> {
        await this.verifyText(this.searchResultEmployeeId, expectedText)

    }
}