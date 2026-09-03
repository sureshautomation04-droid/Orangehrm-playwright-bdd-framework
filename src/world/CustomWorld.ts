import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { EmployePage } from "../pages/EmployeePage";
import { SearchemployeePage } from "../pages/SearchemployeePage";
import { DeleteEmployeePage } from "../pages/DeleteemployeePage";
import { EmployeeTestData, EmployeePersonalDetails } from "../utils/TestDataGenerator";


export class CustomWorld extends World {
    // Static employee ID persisted across scenarios
    static sharedEmployeeId?: string = "";

    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    loginPage?: LoginPage;
    employeePage?: EmployePage;
    searchemployeePage?: SearchemployeePage;
    deleteemployeePage?: DeleteEmployeePage;

    testData?: EmployeeTestData;
    personalData?: EmployeePersonalDetails;
    employeeId?: string = "";


    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);