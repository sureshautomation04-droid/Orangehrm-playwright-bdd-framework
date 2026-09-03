import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/CustomWorld";
import { searchEmployeeBySharedId } from "../helpers/employeeHelper";

When(/^user searches employee using employee id(?: again)?$/, async function (this: CustomWorld) {
    await searchEmployeeBySharedId(this);
});

Then('employee record should be displayed in search results', async function (this: CustomWorld) {
    await this.searchemployeePage!.getSearchResultEmployeeId(this.employeeId!);
});
