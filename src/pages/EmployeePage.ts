import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export class EmployePage extends BasePage {

    // Navigation locators
    private readonly pimLink: Locator;
    private readonly addEmployeeLink: Locator;

    // Add Employee form locators
    private readonly firstNameTextbox: Locator;
    private readonly middleNameTextbox: Locator;
    private readonly lastNameTextbox: Locator;
    private readonly employeePhotoUpload: Locator;
    private readonly createLoginDetailsToggle: Locator;
    private readonly userNameTextbox: Locator;
    private readonly passWordTextbox: Locator;
    private readonly confirmpassWordTextbox: Locator;
    private readonly testFieldTextbox: Locator;


    // Add Personal Details from locators
    private readonly emplyeeIdTextbox: Locator;
    private readonly otherIdTextbox: Locator;
    private readonly driverLicenseTextbox: Locator;

    //Button locators
    private readonly saveButton: Locator;
    private readonly customFieldSaveButton: Locator;

    //Date calender
    private readonly licenseExpiryDateTextbox: Locator;
    private readonly calenderClose: Locator;
    private readonly nationalityDropdownTrigger: Locator;
    private readonly maritalStatusDropdownTrigger: Locator;
    private readonly dateofBirthTextbox: Locator;
    private readonly bloodtypeDropdownTrigger: Locator;

    //Toast Message
    private readonly successToastMessage: Locator;
    private readonly successToastUpdateMessage: Locator;
    

    constructor(page: Page) {
        super(page);

        this.pimLink = page.getByRole('link', { name: 'PIM' });
        this.addEmployeeLink = page.getByRole('link', { name: 'Add Employee' });
        this.firstNameTextbox = page.getByRole("textbox", { name: "First Name" });
        this.middleNameTextbox = page.getByRole("textbox", { name: "Middle Name" });
        this.lastNameTextbox = page.getByRole("textbox", { name: "Last Name" });
        this.employeePhotoUpload = page.locator('input[type="file"]');
        this.createLoginDetailsToggle = page.locator('.oxd-switch-input');
        this.userNameTextbox = page.locator("//label[text()='Username']/following::input[1]");
        this.passWordTextbox = page.locator('//label[text()="Password"]/following::input[1]');
        this.confirmpassWordTextbox = page.locator('//label[text()="Confirm Password"]/following::input[1]');
        this.saveButton = page.getByRole("button", { name: "Save" }).first();
        this.successToastMessage = page.getByText('Successfully Saved');
        this.emplyeeIdTextbox = page.locator("//label[text()='Employee Id']/following::input[1]");
        this.otherIdTextbox = page.locator('.oxd-input-group').filter({ hasText: "Other Id" }).locator("input");
        this.driverLicenseTextbox = page.locator('.oxd-input-group').filter({ hasText: "Driver's License Number" }).locator('input');
        this.licenseExpiryDateTextbox = page.locator("//label[text()='License Expiry Date']//following::input[1]");
        this.calenderClose = page.getByText("Close");
        this.nationalityDropdownTrigger = page.locator('.oxd-select-text').first();
        this.maritalStatusDropdownTrigger = page.locator(".oxd-select-text").nth(1);
        this.dateofBirthTextbox = page.locator("//label[text()='Date of Birth']//following::input").first();
        this.successToastUpdateMessage = page.getByText('Successfully Updated');
        this.bloodtypeDropdownTrigger = page.locator(".oxd-select-text").last();
        this.testFieldTextbox = page.locator('.oxd-input').last();
        this.customFieldSaveButton = page.getByRole('button', { name: 'Save' }).last();

    }

    async clickPimLink(): Promise<void> {
        await this.click(this.pimLink);
    }

    async clickAddEmployeeLinkOrButton(): Promise<void> {
        await this.waitForElement(this.addEmployeeLink);
        await this.click(this.addEmployeeLink);
    }

    async enterEmployeeDetails(firstname: string, middlename: string, lastname: string): Promise<void> {
        await this.fill(this.firstNameTextbox, firstname);
        await this.fill(this.middleNameTextbox, middlename);
        await this.fill(this.lastNameTextbox, lastname);
    }

    async uploadPhoto(filePath: string): Promise<void> {
        const path = filePath
        await this.waitForSelector(this.employeePhotoUpload);
        await this.uploadFile(this.employeePhotoUpload, path);
    }

    async clickLoginDetailsToggle(): Promise<void> {
        await this.click(this.createLoginDetailsToggle);
    }

    async enterLoginCredentials(username: string, status: string, password: string): Promise<void> {
        await this.fill(this.userNameTextbox, username);

        const statusvalue: "1" | "2" = status.toLowerCase() === 'enabled' ? '1' : '2';
        const statusRadioButton: Locator = this.page.locator(`input[value="${statusvalue}"] + span`);
        await this.selectRadio(statusRadioButton);
        await this.fill(this.passWordTextbox, password);
        await this.fill(this.confirmpassWordTextbox, password);

    }

    async clickSaveButton(): Promise<void> {
        await this.waitForElement(this.saveButton);
        await this.click(this.saveButton);
    }

    async getToastMessage(expectedMessage: string): Promise<string> {
        await this.waitForVisible(this.successToastMessage);
        await this.verifyEqual(this.successToastMessage, expectedMessage);
        return await this.successToastMessage.innerText();
    }

    async enterOtherId(otherId: string): Promise<void> {
        await this.waitForElement(this.otherIdTextbox);
        await this.type(this.otherIdTextbox, otherId);
    }

    // ==================== Get Employee Details && Verify Employee Details ====================

    async getDisplayedFirstname(expectedFirstName: string): Promise<string> {
        await this.waitForElement(this.firstNameTextbox);
        const firstName: string = (await this.getInputValue(this.firstNameTextbox)).trim();
        console.log('Entered firstname:', firstName);
        await this.verifyEqual(this.firstNameTextbox, expectedFirstName)
        return firstName;
    }

    async getDisplayedMiddlename(expectedMiddleName: string): Promise<string> {
        await this.waitForElement(this.middleNameTextbox);
        const middleName: string = (await this.getInputValue(this.middleNameTextbox)).trim();
        console.log('Entered middlename:', middleName);
        await this.verifyEqual(this.middleNameTextbox, expectedMiddleName)
        return middleName;
    }

    async getDisplayedLastname(expectedLastName: string): Promise<string> {
        await this.waitForElement(this.lastNameTextbox);
        const lastName: string = (await this.getInputValue(this.lastNameTextbox)).trim();
        console.log('Entered lastname:', lastName);
        await this.verifyEqual(this.lastNameTextbox, expectedLastName);
        return lastName;
    }

    async getDisplayedEmployeeId(): Promise<string> {
        await this.waitForElement(this.emplyeeIdTextbox);
        const employeeId: string = (await this.getInputValue(this.emplyeeIdTextbox)).trim();
        console.log('Entered employeeId:', employeeId);
        return employeeId;
    }

    async getDisplayedOtherId(expectedOtherId: string): Promise<string> {
        await this.waitForElement(this.otherIdTextbox);
        const otherId = (await this.getInputValue(this.otherIdTextbox)).trim();
        console.log('Other ID:', otherId);
        await this.verifyEqual(this.otherIdTextbox, expectedOtherId);
        return otherId;
    }

    async enterdriverLicense(driverlicense: string): Promise<void> {
        await this.type(this.driverLicenseTextbox, driverlicense);
    }

    async enterLicenseExpiryDate(expirydate: string): Promise<void> {
        await this.type(this.licenseExpiryDateTextbox, expirydate)
        await this.waitForElement(this.calenderClose);
        await this.click(this.calenderClose);
    }

    async enterNatinolatiy(option: string): Promise<void> {
        await this.customDropdown(this.nationalityDropdownTrigger, option);

    }

    async enterMaritalStatus(option: string): Promise<void> {
        await this.customDropdown(this.maritalStatusDropdownTrigger, option);
    }

    async enterDateOfBirth(expirydate: string): Promise<void> {
        await this.type(this.dateofBirthTextbox, expirydate)
        await this.waitForElement(this.calenderClose);
        await this.click(this.calenderClose);
    }

    async clickGenderReadioButton(gender: string): Promise<void> {
        const gendervalue: "1" | "2" = gender.toLowerCase() === 'enabled' ? '1' : '2';
        const genderRadioButton: Locator = this.page.locator(`input[value="${gendervalue}"] + span`);
        await this.selectRadio(genderRadioButton);
    
    } 

    async getUpdateToastMessage(expectedMessage: string): Promise<string> {
        await this.waitForVisible(this.successToastUpdateMessage);
        await this.verifyEqual(this.successToastUpdateMessage, expectedMessage);
        await this.waitForElement(this.firstNameTextbox);
        return await this.successToastUpdateMessage.innerText();
    }

    async enterBloodtype(option: string): Promise<void> {
        await this.waitForElement(this.bloodtypeDropdownTrigger);
        await this.customDropdown(this.bloodtypeDropdownTrigger, option);
    }

    async enterTestField(text: string): Promise<void> {
        await this.waitForElement(this.testFieldTextbox);
        await this.type(this.testFieldTextbox, text);
    }

    async clickCustomFieldSaveButton(): Promise<void> {
        await this.waitForElement(this.customFieldSaveButton);
        await this.click(this.customFieldSaveButton);
    }


}