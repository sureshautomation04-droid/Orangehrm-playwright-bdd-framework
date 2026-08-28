import { Locator, Page, expect } from "@playwright/test";
import BasePage from "./BasePage";

export class EmployeePage extends BasePage {
    private readonly pimMenu: Locator;
    private readonly addEmployeeButton: Locator;
    private readonly addEmployee: Locator;
    private readonly firstnameTextbox: Locator;
    private readonly middlenameTextbox: Locator;
    private readonly employeeUploadphoto: Locator;
    private readonly employeeidTexbox: Locator;
    private readonly lastnameTextbox: Locator;
    private readonly createLoginDetails: Locator;
    private readonly usernameTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly confirmpasswordTextbox: Locator;
    private readonly saveButton: Locator;
    private readonly successToastMessage: Locator;
    private readonly driveringLicenseTextbox: Locator;
    private readonly ortherIdTextbox: Locator;
    private readonly licenseExpiryDateTextbox: Locator;
    private readonly nationalityDropdown: Locator;
    private readonly maritalStatusDropdown: Locator;
    private readonly cleanderClose: Locator;
    private readonly moderndropdown: Locator;
    private readonly dateofbirthTextbox: Locator;
    private readonly personalDetailsSavebutton: Locator;
    private readonly successToastUpdateMessage: Locator;
    private readonly bloodGroupDropdown: Locator;
    private readonly testFieldTextbox: Locator;
    private readonly customFieldSavebutton: Locator;



    constructor(page: Page) {
        super(page);

        this.pimMenu = page.getByRole('link', { name: 'PIM' });
        this.addEmployeeButton = page.getByRole("button", { name: "Add" });
        this.addEmployee = page.getByRole("heading", { name: "Add Employee" });
        this.firstnameTextbox = page.getByPlaceholder('First Name');
        this.middlenameTextbox = page.getByRole("textbox", { name: "Middle Name" });
        this.lastnameTextbox = page.getByRole("textbox", { name: "Last Name" });
        this.employeeUploadphoto = page.locator('input[type="file"]');
        this.employeeidTexbox = page.locator('.oxd-input.oxd-input--active').nth(4);
        this.createLoginDetails = page.locator('.oxd-switch-input');
        this.usernameTextbox = page.locator('.oxd-input').nth(5);
        this.passwordTextbox = page.locator('[type="password"]').first();
        this.confirmpasswordTextbox = page.locator('[type="password"]').last();
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.successToastMessage = page.getByText('Successfully Saved');
        this.ortherIdTextbox = page.locator('.oxd-input').nth(5);
        this.driveringLicenseTextbox = page.locator('.oxd-input').nth(6)
        this.licenseExpiryDateTextbox = page.locator('.oxd-input').nth(7);
        this.nationalityDropdown = page.locator('.oxd-select-text-input').first();
        this.maritalStatusDropdown = page.locator('.oxd-select-text-input').nth(1);
        this.cleanderClose = page.getByText('Close');
        this.moderndropdown = page.locator('.oxd-select-option'); //oxd-select-text-input
        this.dateofbirthTextbox = page.locator('.oxd-input').nth(8);
        this.personalDetailsSavebutton = page.getByRole('button',{name: 'Save'}).first();
        this.successToastUpdateMessage = page.getByText('Successfully Updated');
        this.bloodGroupDropdown = page.locator('.oxd-select-text-input').last();
        this.testFieldTextbox = page.locator('.oxd-input').last();
        //this.customFieldSavebutton = page.locator('.oxd-button').nth(1);
        this.customFieldSavebutton = page.getByRole('button',{name: 'Save'}).nth(1);


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
        await this.uploadFile(this.employeeUploadphoto, 'src/data/image/employeephoto.jpeg')
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

    // TOAST MESSAGE
    async getToastMessage(message: string): Promise<string | null> {
        await this.waitForVisible(this.successToastMessage);
        const actualMessage = await this.successToastMessage.textContent();
        const actualText = actualMessage?.trim() ?? "";
        await this.verifyEqual(actualText, message);
        return actualText
    }

    // GET EMPLOYEE DETAILS
    async getDisplayedFirstName(): Promise<string> {
        return await this.getInputValue(this.firstnameTextbox)
    }

    async getDisplayedMiddleName(): Promise<string> {
        return await this.getInputValue(this.middlenameTextbox)
    }

    async getDisplayedLastName(): Promise<string> {
        return await this.getInputValue(this.lastnameTextbox)
    }

    async getDisplayEmployeeId(): Promise<string> {
        return await this.getInputValue(this.employeeidTexbox);
    }

    async waitForFirstNameField(): Promise<void> {
        await this.waitForElement(this.firstnameTextbox);
    }


    // VERIFY EMPLOYEE DETAILS
    async verifyEmployeeDetails(
        expectedFirstName: string,
        expectedMiddleName: string,
        expectedLastName: string
    ): Promise<void> {

        const actualFirstName: string | null = await this.getDisplayedFirstName();
        await this.verifyEqual(actualFirstName, expectedFirstName);

        const actualMiddleName: string | null = await this.getDisplayedMiddleName();
        await this.verifyEqual(actualMiddleName, expectedMiddleName);

        const actuallastName: string | null = await this.getDisplayedLastName();
        await this.verifyEqual(actuallastName, expectedLastName);
    }

    async enterOtherId(value: string): Promise<void> {
        await this.type(this.ortherIdTextbox, value);
    }

    async enterDriversLicenseNumber(value: string): Promise<void> {
        await this.type(this.driveringLicenseTextbox, value);
    }

    async enterLicenseExpairedata(value: string): Promise<void> {
        await this.type(this.licenseExpiryDateTextbox, value);
        await this.click(this.cleanderClose);
    }

    async clickNationalityDropdown(option: string): Promise<void> {
        await this.selectDropdownOption(
            this.nationalityDropdown,
            this.moderndropdown,
            option
        );
    }

    async clickmaritalStatusDropdown(option: string): Promise<void> {
        await this.selectDropdownOption(
            this.maritalStatusDropdown,
            this.moderndropdown,
            option
        );
    }

    async enterDataofBirth(value: string): Promise<void> {
        await this.type(this.dateofbirthTextbox, value);
        await this.click(this.cleanderClose);
    }

    async clickGenderCheckbox(value: string): Promise<void> {
        const radioButton = this.page.locator(`[type="radio"][value="${value}"]`);
        const radioWrapper = radioButton.locator('..').locator('.oxd-radio-input');
        await this.selectRadio(radioWrapper);
    }

    async clickPersinalInformationSaveButton(): Promise<void> {
        await this.click(this.personalDetailsSavebutton);
    }

    async getUpadateToastMessage(message: string): Promise<string | null> {
        await this.waitForElement(this.successToastUpdateMessage);
        const actualMessage = await this.successToastUpdateMessage.textContent();
        const actualText = actualMessage?.trim() ?? "";
        await this.verifyEqual(actualText, message);
        return actualText
    }

     async clickBloodGroupDropdown(option: string): Promise<void> {
        await this.waitForElement(this.bloodGroupDropdown);
        await this.selectDropdownOption(
            this.bloodGroupDropdown,
            this.moderndropdown,
            option
        );
    }

    async entertestFeild(text: string) {
        await this.type(this.testFieldTextbox,text)
    }

     async clickcustomFieldnSaveButton(): Promise<void> {
        await this.click(this.customFieldSavebutton);
    }

   

}