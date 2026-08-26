import { Locator, Page, expect } from "@playwright/test";
import BasePage from "./BasePage";

export class EmployeePage extends BasePage {
    private readonly pimMenu: Locator;
    private readonly addEmployeeButton: Locator;
    private readonly addEmployee: Locator;
    private readonly firstnameTextbox: Locator;
    private readonly middlenameTextbox: Locator;
    private readonly employeeUploadphoto: Locator;
    private readonly lastnameTextbox: Locator;
    private readonly createLoginDetails: Locator;
    private readonly usernameTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly confirmpasswordTextbox: Locator;
    private readonly saveButton: Locator;
    private readonly employeeName: Locator;


    constructor(page: Page) {
        super(page);

        this.pimMenu = page.getByRole('link', { name: 'PIM' });
        this.addEmployeeButton = page.getByRole("button", { name: "Add" });
        this.addEmployee = page.getByRole("heading", { name: "Add Employee" });
        this.firstnameTextbox = page.getByRole("textbox", { name: "First Name" });
        this.middlenameTextbox = page.getByRole("textbox", { name: "Middle Name" });
        this.employeeUploadphoto = page.locator('input[type="file"]');
        this.lastnameTextbox = page.getByRole("textbox", { name: "Last Name" });
        this.createLoginDetails = page.locator('.oxd-switch-input');
        this.usernameTextbox = page.locator('.oxd-input').nth(5);
        this.passwordTextbox = page.locator('[type="password"]').first();
        this.confirmpasswordTextbox = page.locator('[type="password"]').last();
        this.saveButton = page.getByRole('button', {name: 'Save'});
        this.employeeName = page.locator('[class="oxd-text oxd-text--h6 --strong"]');

    }

    async clickPim(): Promise<void> {
        await this.click(this.pimMenu)
    }

    async clickAddEmployee(): Promise<void> {
        await this.click(this.addEmployeeButton)
    }

    async verifyVisibleAddEmployeePage(): Promise<void> {
        await this.waitForElement(this.addEmployee);
        await this.verifyVisible(this.addEmployee);
    }

    async uploadPhoto(): Promise<void> {
        await this.waitForSelector(this.employeeUploadphoto);
        await this.uploadFile(this.employeeUploadphoto, 'src/data/download.jpeg')
    }

    async enterEmployeeDetails(firstname: string, middlename: string, lastname: string): Promise<void> {
        await this.fill(this.firstnameTextbox, firstname);
        await this.fill(this.middlenameTextbox, middlename);
        await this.fill(this.lastnameTextbox, lastname);
    }

    async enableLoginDetails(): Promise<void> {
        await this.click(this.createLoginDetails);
    }

    async enterUsernameDetails(username: string, value: string, password: string): Promise<void> {
        await this.fill(this.usernameTextbox, username);
        const statusRadioButton = this.page.locator(`//input[@value='${value}']/following-sibling::span`);
        await this.selectRadio(statusRadioButton);
        await this.fill(this.passwordTextbox, password);
        await this.fill(this.confirmpasswordTextbox, password);
    }
    
    async clickSaveButton(): Promise<void> {
        await this.click(this.saveButton);
    }

    async verifySaveEmployeename(firstname: string): Promise<void> {
        await this.waitForElement(this.employeeName);
        await this.verifyContainsText(this.employeeName, firstname);
    }


}