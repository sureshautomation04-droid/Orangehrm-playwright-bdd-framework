import { Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../world/CustomWorld";

When("user deletes the employee", async function (this: CustomWorld) {
    await this.deleteemployeePage!.deleteEmployeeId();
});

Then("employee should be deleted successfully", async function (this: CustomWorld) {
    await this.deleteemployeePage!.deleteToastMessage(this.testData!.deleteToastMessage);
});

Then("employee should not be displayed in search result", async function (this: CustomWorld) {
    await this.deleteemployeePage!.isVerifyEmployeeRowCount();
});
