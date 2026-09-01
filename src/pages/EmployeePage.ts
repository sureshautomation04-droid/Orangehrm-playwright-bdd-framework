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

    // Add Personal Details from locators
    private readonly emplyeeIdTextbox: Locator;
    private readonly otherIdTextbox: Locator;

    //Button locators
    private readonly saveButton: Locator;

    //Toast Message
    private readonly successToastMessage: Locator;

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
        this.saveButton = page.getByRole("button", { name: "Save" });
        this.successToastMessage = page.getByText('Successfully Saved');
        this.emplyeeIdTextbox = page.locator("//label[text()='Employee Id']/following::input[1]");
        this.otherIdTextbox = page.locator("//label[text()='Other Id']/following::input[1]");
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

    async enterLoginCredentials(username: string, gender: string, password: string): Promise<void> {
        await this.fill(this.userNameTextbox, username);

        const statusvalue: "1" | "2" = gender.toLowerCase() === 'enabled' ? '1' : '2';
        const statusRadioButton: Locator = this.page.locator(`input[value="${statusvalue}"] + span`);
        await this.selectRadio(statusRadioButton);
        await this.fill(this.passWordTextbox, password);
        await this.fill(this.confirmpassWordTextbox, password);

    }

    async clickSaveButton(): Promise<void> {
        await this.click(this.saveButton);
    }

    async getToastMessage(expectedMessage: string): Promise<string> {
        await this.waitForVisible(this.successToastMessage);
        await this.verifyEqual(this.successToastMessage, expectedMessage);
        return await this.successToastMessage.innerText();
    }

       async enterOtherId(otherId: string): Promise<void> {
        await this.waitForElement(this.otherIdTextbox);
        await this.fill(this.otherIdTextbox, otherId);
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
        await this.verifyEqual(this.otherIdTextbox,expectedOtherId);
        return otherId;
    }

   

}