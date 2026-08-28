import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../pages/LoginPage";
import { EmployeePage } from "../pages/EmployeePage";
import { ConfigManager } from "../config/ConfigManager";
import { generateTestData } from "../utils/TestDataGenerator";

let loginPage: LoginPage;
let employeePage: EmployeePage;
let employeeId: string;

const employeeData = generateTestData()

Given("user is logged into OrangeHRM application", async function () {

    loginPage = new LoginPage(this.page);
    await loginPage.navigate(ConfigManager.baseURL);
    await loginPage.waitForApp();
    await loginPage.login(ConfigManager.username, ConfigManager.password);
    await loginPage.verifyDashboardPage();
    await loginPage.verifyURL(/dashboard/);
    employeePage = new EmployeePage(this.page)

});

When("user navigates to PIM module", async function () {
    await employeePage.clickPim();
});

When("user clicks on Add Employee button", async function () {
    await employeePage.clickAddEmployee();
    await employeePage.verifyVisibleAddEmployeePage()
});

When("user enter employee details", async function () {
    await employeePage.enterEmployeeDetails(
        employeeData.firstName,
        employeeData.middleName,
        employeeData.lastName
    );
});

When("user uploads employee photo", async function () {
    await employeePage.uploadPhoto();
});

When("user enable Create Login Details Option", async function () {
    await employeePage.enableLoginDetails();
});

When("user enter login credentials", async function () {
    await employeePage.enterUsernameDetails(
        employeeData.username,
        employeeData.status,
        employeeData.password
    );
});

When("user click save button", async function () {
    await employeePage.clickSaveButton();
});

When("employee should be add successfully", async function () {
    await employeePage.getToastMessage(employeeData.toastMessage);
});

When("Display the employee details", async function () {
    await employeePage.waitForFirstNameField();
    employeeId = await employeePage.getDisplayEmployeeId();

    console.log(`Employee ID: ${employeeId}`);

    await employeePage.verifyEmployeeDetails(
        employeeData.firstName,
        employeeData.middleName,
        employeeData.lastName
    );
});

Then("Enter employee Personal details", async function () {
    await employeePage.enterOtherId('12345');
    await employeePage.enterDriversLicenseNumber('5678945');
    await employeePage.enterLicenseExpairedata('2026-29-12');
    await employeePage.clickNationalityDropdown('India');
    await employeePage.clickmaritalStatusDropdown('Single');
    await employeePage.enterDataofBirth('1994-29-12');
    await employeePage.clickGenderCheckbox('2')
    await employeePage.clickPersinalInformationSaveButton();
    await employeePage.getUpadateToastMessage('Successfully Updated');
    await employeePage.clickBloodGroupDropdown('B+');
    await employeePage.entertestFeild('Negative');
    await employeePage.clickcustomFieldnSaveButton();
    await employeePage.getToastMessage(employeeData.toastMessage);

})