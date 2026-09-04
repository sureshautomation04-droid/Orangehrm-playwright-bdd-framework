import { Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/CustomWorld";

Then("employee record should be displayed in search results", async function (this: CustomWorld) {
    await this.searchemployeePage!.getSearchResultEmployeeId(this.employeeId!);
});
