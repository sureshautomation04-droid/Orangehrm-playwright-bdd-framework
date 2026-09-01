import { World, IWorldOptions, setWorldConstructor } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { EmployeeTestData, EmployeePersonalDetails} from "../utils/TestDataGenerator";
import { EmployePage } from "../pages/EmployeePage";

export class CustomWorld extends World {

    // ============================================================
    // Playwright Objects
    // ============================================================

    /**
     * ! = Definite Assignment Assertion
     *
     * These properties are required for the scenario,
     * but they are initialized later in the Before hook.
     */
    public browser!: Browser;
    public context!: BrowserContext;
    public page!: Page;


    // ============================================================
    // Page Objects
    // ============================================================

    /**
     * ? = Optional Property
     *
     * These Page Objects can be initialized during the scenario setup.
     */
    public loginPage?: LoginPage;
    public employeePage?: EmployePage;
   



    /**
     * Test data generated for the current scenario.
     */
    public testData?: EmployeeTestData;
    public personalData?: EmployeePersonalDetails;
    public employeeId?: string;


    constructor(options: IWorldOptions) {
        super(options);
    }
}


// Register CustomWorld with Cucumber
setWorldConstructor(CustomWorld);