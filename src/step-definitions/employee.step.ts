import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/CustomWorld";

When("user navigates to PIM module", async function (this: CustomWorld) {
    await this.employeePage!.clickPimLink();
});

When("user clicks on Add Employee button", async function (this: CustomWorld) {
    await this.employeePage!.clickAddEmployeeLinkOrButton();
});

When("user enter login credentials", async function (this: CustomWorld) {
    await this.employeePage!.enterEmployeeDetails(this.testData!.firstName, this.testData!.middleName, this.testData!.lastName);
    await this.employeePage!.uploadPhoto("src/data/image/employeephoto.jpeg");
    await this.employeePage!.clickLoginDetailsToggle();
    await this.employeePage!.enterLoginCredentials(this.testData!.username, this.testData!.status, this.testData!.password);
});

When("user click save button", async function (this: CustomWorld) {
    await this.employeePage!.clickSaveButton();
});

When("employee should be add successfully", async function (this: CustomWorld) {
    await this.employeePage!.getToastMessage(this.testData!.toastMessage);
    this.employeeId = await this.employeePage!.getDisplayedEmployeeId();
    CustomWorld.sharedEmployeeId = this.employeeId;
});

When("Display the employee details", async function (this: CustomWorld) {
    await this.employeePage!.getDisplayedFirstname(this.testData!.firstName);
    await this.employeePage!.getDisplayedMiddlename(this.testData!.middleName);
    await this.employeePage!.getDisplayedLastname(this.testData!.lastName);
    await this.employeePage!.enterOtherId(this.personalData!.otherId);
    await this.employeePage!.getDisplayedOtherId(this.personalData!.otherId);
});

Then("Enter employee Personal details", async function (this: CustomWorld) {
    await this.employeePage!.enterdriverLicense(this.personalData!.drivingLicenseNumber);
    await this.employeePage!.enterLicenseExpiryDate(this.personalData!.licenseExpiryDate);
    await this.employeePage!.enterNatinolatiy(this.personalData!.nationality);
    await this.employeePage!.enterMaritalStatus(this.personalData!.maritalStatus);
    await this.employeePage!.enterDateOfBirth(this.personalData!.dateOfBirth);
    await this.employeePage!.clickGenderReadioButton(this.personalData!.gender);
    await this.employeePage!.clickSaveButton();
    await this.employeePage!.getUpdateToastMessage(this.personalData!.updateToastMessage);
    await this.employeePage!.enterBloodtype(this.personalData!.bloodGroup);
    await this.employeePage!.enterTestField(this.personalData!.testField);
    await this.employeePage!.clickCustomFieldSaveButton();
    await this.employeePage!.getToastMessage(this.testData!.toastMessage);
});
