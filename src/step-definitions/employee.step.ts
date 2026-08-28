import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../pages/LoginPage";
import { EmployeePage } from "../pages/EmployeePage";
import { ConfigManager } from "../config/ConfigManager";
import { generateEmployeeTestData, EmployeeTestData } from "../utils/TestDataGenerator";
import { employeePersonalDetails } from "../data/test-data/EmployeePersonalDetails";

let loginPage: LoginPage;
let employeePage: EmployeePage;
let employeeId: string;
let testData: EmployeeTestData;

Given("user is logged into OrangeHRM application", async function () {
    loginPage = new LoginPage(this.page);
    await loginPage.navigate(ConfigManager.baseURL);
    await loginPage.waitForApp();
    await loginPage.login(ConfigManager.username, ConfigManager.password);
    await loginPage.verifyDashboardPage();
    await loginPage.verifyURL(/dashboard/);
    employeePage = new EmployeePage(this.page);
    testData = generateEmployeeTestData();
});

When("user navigates to PIM module", async function () {
    await employeePage.clickPim();
});

When("user clicks on Add Employee button", async function () {
    await employeePage.clickAddEmployee();
    await employeePage.verifyVisibleAddEmployeePage();
});

When("user enter employee details", async function () {
    await employeePage.enterEmployeeDetails(
        testData.firstName,
        testData.middleName,
        testData.lastName
    );
});

When("user uploads employee photo", async function () {
    await employeePage.uploadPhoto();
});

When("user enable Create Login Details Option", async function () {
    await employeePage.enableLoginDetails();
});

When("user enter login credentials", async function () {
    await employeePage.enterLoginCredentials(
        testData.username,
        testData.status,
        testData.password
    );
});

When("user click save button", async function () {
    await employeePage.clickSaveButton();
});

When("employee should be add successfully", async function () {
    await employeePage.getToastMessage(testData.toastMessage);
});

When("Display the employee details", async function () {
    await employeePage.waitForFirstNameField();
    employeeId = await employeePage.getDisplayedEmployeeId();
    console.log(`Employee ID: ${employeeId}`);
    await employeePage.verifyEmployeeDetails(
        testData.firstName,
        testData.middleName,
        testData.lastName
    );
});

Then("Enter employee Personal details", async function () {
    await employeePage.clickPersonalDetailsTab();
    await employeePage.enterOtherId(employeePersonalDetails.otherId);
    await employeePage.enterDriversLicenseNumber(employeePersonalDetails.drivingLicenseNumber);
    await employeePage.enterLicenseExpiryDate(employeePersonalDetails.licenseExpiryDate);
    await employeePage.selectNationality(employeePersonalDetails.nationality);
    await employeePage.selectMaritalStatus(employeePersonalDetails.maritalStatus);
    await employeePage.enterDateOfBirth(employeePersonalDetails.dateOfBirth);
    await employeePage.selectGender(employeePersonalDetails.gender);
    await employeePage.clickPersonalDetailsSaveButton();
    await employeePage.getUpdateToastMessage(employeePersonalDetails.updateToastMessage);
    await employeePage.selectBloodGroup(employeePersonalDetails.bloodGroup);
    await employeePage.enterTestField(employeePersonalDetails.testField);
    await employeePage.clickCustomFieldSaveButton();
    await employeePage.getToastMessage(testData.toastMessage);
});