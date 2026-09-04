import { Then, When } from "@cucumber/cucumber";
import { CustomWorld } from "../world/CustomWorld";

When("user clicks edit employee icon", async function (this: CustomWorld) {
    await this.editdriverlicensePage!.clickEditEmployee();
});

When("user update driver license number", async function (this: CustomWorld) {
    await this.editdriverlicensePage!.clearAndUpdateDriverLicense(this.personalData!.drivingLicenseNumber);
});

Then("driver license should be updated successfully", async function (this: CustomWorld) {
    await this.editdriverlicensePage!.getUpdateToastMessage(this.personalData!.updateToastMessage);
});

Then("update driver license number should be displayed", async function (this: CustomWorld) {
    await this.editdriverlicensePage!.verifyUpdatedDriverLicenseNumber(this.personalData!.drivingLicenseNumber);
});
