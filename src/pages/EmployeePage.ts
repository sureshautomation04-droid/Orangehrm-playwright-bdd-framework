import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export class EmployeePage extends BasePage {
    // Navigation locators
    private readonly pimMenu: Locator;
    private readonly addEmployeeButton: Locator;
    private readonly addEmployeeHeader: Locator;
    private readonly personalDetailsTab: Locator;

    // Add Employee form locators
    private readonly firstnameTextbox: Locator;
    private readonly middlenameTextbox: Locator;
    private readonly lastnameTextbox: Locator;
    private readonly employeeUploadphoto: Locator;
    private readonly employeeIdTextbox: Locator;
    private readonly createLoginDetailsToggle: Locator;

    // Login details locators
    private readonly usernameTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly confirmpasswordTextbox: Locator;

    // Action buttons
    private readonly saveButton: Locator;
    private readonly personalDetailsSaveButton: Locator;
    private readonly customFieldSaveButton: Locator;

    // Toast messages
    private readonly successToastMessage: Locator;
    private readonly successToastUpdateMessage: Locator;

    // Personal Details locators
    private readonly otherIdTextbox: Locator;
    private readonly drivingLicenseTextbox: Locator;
    private readonly licenseExpiryDateTextbox: Locator;
    private readonly nationalityDropdown: Locator;
    private readonly maritalStatusDropdown: Locator;
    private readonly dateOfBirthTextbox: Locator;
    private readonly bloodGroupDropdown: Locator;
    private readonly calendarCloseButton: Locator;

    // Custom Fields locators
    private readonly testFieldTextbox: Locator;

    // Dropdown options (dynamic)
    private readonly dropdownOptions: Locator;

    constructor(page: Page) {
        super(page);

        // Navigation
        this.pimMenu = page.getByRole('link', { name: 'PIM' });
        this.addEmployeeButton = page.getByRole("button", { name: "Add" });
        this.addEmployeeHeader = page.getByRole("heading", { name: "Add Employee" });
        this.personalDetailsTab = page.getByRole('tab', { name: 'Personal Details' });

        // Add Employee form
        this.firstnameTextbox = page.getByPlaceholder('First Name');
        this.middlenameTextbox = page.getByRole("textbox", { name: "Middle Name" });
        this.lastnameTextbox = page.getByRole("textbox", { name: "Last Name" });
        this.employeeUploadphoto = page.locator('input[type="file"]');
        this.employeeIdTextbox = page.locator('//label[text()="Employee Id"]/following::input[1]');
        this.createLoginDetailsToggle = page.locator('.oxd-switch-input');

        // Login details
        this.usernameTextbox = page.locator('//label[text()="Username"]/following::input[1]');
        this.passwordTextbox = page.locator('//label[text()="Password"]/following::input[1]');
        this.confirmpasswordTextbox = page.locator('//label[text()="Confirm Password"]/following::input[1]');

        // Action buttons
        this.saveButton = page.getByRole('button', { name: 'Save' }).first();
        this.personalDetailsSaveButton = page.getByRole('button', { name: 'Save' }).first();
        this.customFieldSaveButton = page.getByRole('button', { name: 'Save' }).last();

        // Toast messages
        this.successToastMessage = page.getByText('Successfully Saved');
        this.successToastUpdateMessage = page.getByText('Successfully Updated');;

        // Personal Details - using more robust locators
        this.otherIdTextbox = page.locator('//label[contains(text(), "Other Id")]/following::input[1]');
        this.drivingLicenseTextbox = page.locator('[class="oxd-input oxd-input--focus"]');
        this.licenseExpiryDateTextbox = page.locator('//label[contains(text(), "License Expiry Date")]/following::input[1]');
        this.nationalityDropdown = page.locator('//label[contains(text(), "Nationality")]/following::div[contains(@class, "oxd-select-text")][1]');
        this.maritalStatusDropdown = page.locator('//label[contains(text(), "Marital Status")]/following::div[contains(@class, "oxd-select-text")][1]');
        this.dateOfBirthTextbox = page.locator('//label[contains(text(), "Date of Birth")]/following::input[1]');
        this.bloodGroupDropdown = page.locator('.oxd-select-text-input').last();
        this.calendarCloseButton = page.getByText('Close');

        // Custom Fields
        this.testFieldTextbox = page.locator('.oxd-input').last();

        // Dropdown options (reusable for all dropdowns)
        this.dropdownOptions = page.locator('.oxd-select-option');
    }

    // ==================== Navigation Methods ====================

    async clickPim(): Promise<void> {
        await this.click(this.pimMenu);
    }

    async clickPersonalDetailsTab(): Promise<void> {
        await this.click(this.personalDetailsTab);
    }

    async clickAddEmployee(): Promise<void> {
        await this.click(this.addEmployeeButton);
    }

    async verifyVisibleAddEmployeePage(): Promise<void> {
        await this.waitForElement(this.addEmployeeHeader);
        await this.verifyVisible(this.addEmployeeHeader);
    }

    // ==================== Employee Details Methods ====================

    async uploadPhoto(filePath?: string): Promise<void> {
        const path = filePath || 'src/data/image/employeephoto.jpeg';
        await this.waitForSelector(this.employeeUploadphoto);
        await this.uploadFile(this.employeeUploadphoto, path);
    }

    async enterEmployeeDetails(firstname: string, middlename: string, lastname: string): Promise<void> {
        await this.fill(this.firstnameTextbox, firstname);
        await this.fill(this.middlenameTextbox, middlename);
        await this.fill(this.lastnameTextbox, lastname);
    }

    async enableLoginDetails(): Promise<void> {
        await this.click(this.createLoginDetailsToggle);
    }

    async enterLoginCredentials(username: string, status: string, password: string): Promise<void> {
        await this.fill(this.usernameTextbox, username);

        const statusValue = status.toLowerCase() === 'enabled' ? '1' : '2';
        const statusRadioButton = this.page.locator(`//input[@value='${statusValue}']/following-sibling::span`);
        await this.selectRadio(statusRadioButton);

        await this.fill(this.passwordTextbox, password);
        await this.fill(this.confirmpasswordTextbox, password);
    }

    async clickSaveButton(): Promise<void> {
        await this.click(this.saveButton);
    }

    // ==================== Toast Message Methods ====================

    async getToastMessage(expectedMessage: string): Promise<string> {
        await this.waitForVisible(this.successToastMessage);
        const actualMessage = (await this.successToastMessage.textContent())?.trim() ?? "";
        await this.verifyEqual(actualMessage, expectedMessage);
        return actualMessage;
    }

    async getUpdateToastMessage(expectedMessage: string): Promise<string> {
        await this.waitForVisible(this.successToastUpdateMessage);
        const actualMessage = (await this.successToastUpdateMessage.textContent())?.trim() ?? "";
        await this.verifyEqual(actualMessage, expectedMessage);
        return actualMessage;
    }

    // ==================== Get Employee Details ====================

    async getDisplayedFirstName(): Promise<string> {
        return await this.getInputValue(this.firstnameTextbox);
    }

    async getDisplayedMiddleName(): Promise<string> {
        return await this.getInputValue(this.middlenameTextbox);
    }

    async getDisplayedLastName(): Promise<string> {
        return await this.getInputValue(this.lastnameTextbox);
    }

    async getDisplayedEmployeeId(): Promise<string> {
        return await this.getInputValue(this.employeeIdTextbox);
    }

    async waitForFirstNameField(): Promise<void> {
        await this.waitForElement(this.firstnameTextbox);
    }

    // ==================== Verify Employee Details ====================

    async verifyEmployeeDetails(
        expectedFirstName: string,
        expectedMiddleName: string,
        expectedLastName: string
    ): Promise<void> {
        const actualFirstName = await this.getDisplayedFirstName();
        await this.verifyEqual(actualFirstName, expectedFirstName);

        const actualMiddleName = await this.getDisplayedMiddleName();
        await this.verifyEqual(actualMiddleName, expectedMiddleName);

        const actualLastName = await this.getDisplayedLastName();
        await this.verifyEqual(actualLastName, expectedLastName);
    }

    // ==================== Personal Details Methods ====================

    async enterOtherId(value: string): Promise<void> {
        await this.type(this.otherIdTextbox, value);
    }

    async enterDriversLicenseNumber(value: string): Promise<void> {
        await this.waitForElement(this.drivingLicenseTextbox);
        await this.type(this.drivingLicenseTextbox, value);
    }

    async enterLicenseExpiryDate(value: string): Promise<void> {
        await this.type(this.licenseExpiryDateTextbox, value);
        await this.click(this.calendarCloseButton);
    }

    async selectNationality(option: string): Promise<void> {
        await this.selectDropdownOption(this.nationalityDropdown, this.dropdownOptions, option);
    }

    async selectMaritalStatus(option: string): Promise<void> {
        await this.selectDropdownOption(this.maritalStatusDropdown, this.dropdownOptions, option);
    }

    async enterDateOfBirth(value: string): Promise<void> {
        await this.type(this.dateOfBirthTextbox, value);
        await this.click(this.calendarCloseButton);
    }

    async selectGender(gender: string): Promise<void> {
        const genderValue = gender.toLowerCase() === 'male' ? '1' : '2';
        const radioButton = this.page.locator(`[type="radio"][value="${genderValue}"]`);
        const radioWrapper = radioButton.locator('..').locator('.oxd-radio-input');
        await this.selectRadio(radioWrapper);
    }

    async clickPersonalDetailsSaveButton(): Promise<void> {
        await this.click(this.personalDetailsSaveButton);
    }



    // ==================== Custom Fields Methods ====================

    async selectBloodGroup(option: string): Promise<void> {
        await this.waitForElement(this.bloodGroupDropdown);
        await this.selectDropdownOption(this.bloodGroupDropdown, this.dropdownOptions, option);
    }

    async enterTestField(text: string): Promise<void> {
        await this.type(this.testFieldTextbox, text);
    }

    async clickCustomFieldSaveButton(): Promise<void> {
        await this.click(this.customFieldSaveButton);
    }
}