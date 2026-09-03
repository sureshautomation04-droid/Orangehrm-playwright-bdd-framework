import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/CustomWorld";
import { searchEmployeeBySharedId } from "../helpers/employeeHelper";

When(/^user searches employee using employee id(?: again)?$/, async function (this: CustomWorld) {

      // Use the employee ID persisted from a previous scenario (e.g., Add Employee)
    // if (!CustomWorld.sharedEmployeeId) {
    //     throw new Error('No employee ID found. Run the "Add Employee" scenario first.');
    // }
    // this.employeeId = CustomWorld.sharedEmployeeId;
    // await this.employeePage!.clickPimLink();
    // await this.searchemployeePage!.enterEmployeeIdforSearch(this.employeeId);

    await searchEmployeeBySharedId(this);
});

Then('employee record should be displayed in search results', async function (this: CustomWorld) {
    await this.searchemployeePage!.getSearchResultEmployeeId(this.employeeId!);
});
