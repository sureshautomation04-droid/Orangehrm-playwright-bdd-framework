import { Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../world/CustomWorld";

When('user deletes the employee', async function (this: CustomWorld) {
    await this.deleteemployeePage!.deleteEmployeeId();
});

Then('employee should be deleted successfully', async function (this: CustomWorld) {
    await this.deleteemployeePage!.deleteToastMessage(this.testData!.deleteToastMessage);
});

// NOTE: "user searches employee using employee id" (+ " again") is defined once
// in searchemployee.step.ts via regex /user searches employee using employee id(?: again)?/
// and reuses helpers/employeeHelper.ts — no duplication here.

Then('employee should not be displayed in earch result', async function (this: CustomWorld) {
    await this.deleteemployeePage!.isVerifyEmployeeRowCount()
})