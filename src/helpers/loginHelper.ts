import { CustomWorld } from "../world/CustomWorld";
import { ConfigManager } from "../config/ConfigManager";

/**
 * Single source for "logged in + on dashboard".
 * Replaces the duplicated Given('user is logged into OrangeHRM application') scattered across pim/search/delete/edit features.
 */
export async function loginAsDefaultUser(world: CustomWorld): Promise<void> {
    await world.loginPage!.navigate(ConfigManager.baseURL, {
        timeout: 120000,
        waitUntil: "domcontentloaded",
    });
    await world.loginPage!.login(ConfigManager.username, ConfigManager.password);
    await world.loginPage!.verifyDashboardPage();
}
