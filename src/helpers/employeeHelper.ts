import { CustomWorld } from "../world/CustomWorld";

/**
 * Single source of truth for "search by shared employee ID".
 * - Validates sharedEmployeeId exists
 * - Sets world.employeeId
 * - Navigates to PIM and performs the search
 * Reused by both search and delete flows — no duplication in step defs.
 */
export async function searchEmployeeBySharedId(world: CustomWorld): Promise<void> {
    if (!CustomWorld.sharedEmployeeId) {
        throw new Error('No employee ID found. Run the "Add Employee" scenario first.');
    }
    world.employeeId = CustomWorld.sharedEmployeeId;
    await world.employeePage!.clickPimLink();
    await world.searchemployeePage!.enterEmployeeIdforSearch(world.employeeId);
}
