import { Given, When } from "@cucumber/cucumber";
import { CustomWorld } from "../world/CustomWorld";
import { loginAsDefaultUser } from "../helpers/loginHelper";
import { searchEmployeeBySharedId } from "../helpers/employeeHelper";

/** Single definition for "user is logged into OrangeHRM application" — reused by pim/search/delete/edit. */
Given("user is logged into OrangeHRM application", async function (this: CustomWorld) {
    await loginAsDefaultUser(this);
});

/** Covers both "user searches employee using employee id" and "... again". */
When(/^user searches employee using employee id(?: again)?$/, async function (this: CustomWorld) {
    await searchEmployeeBySharedId(this);
});
