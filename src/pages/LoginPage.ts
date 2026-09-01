import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";


export class LoginPage extends BasePage {

    private readonly usernameTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly loginButton: Locator;
    private readonly appElement: Locator;
    private readonly dashboardHeader: Locator;

    constructor(page: Page) {
        super(page);

        this.usernameTextbox = page.locator('input[name="username"]');
        this.passwordTextbox = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');

        // Application root element
        this.appElement = page.locator("#app");
        this.dashboardHeader = page.getByRole("heading", { name: "Dashboard" });
    }

    async waitForApp(): Promise<void> {
        await this.waitForSelector(this.appElement);
    }

    async waitForLoginForm(): Promise<void> {
        await this.waitForElement(this.usernameTextbox);
    }

    async enterUsername(username: string): Promise<void> {
        await this.fill(this.usernameTextbox, username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.fill(this.passwordTextbox, password);
    }

    async clickLogin(): Promise<void> {
        await this.click(this.loginButton);
    }

    async login(username: string, password: string): Promise<void> {
        await this.waitForApp();

        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async verifyDashboardPage(): Promise<void> {
        await this.waitForElement(this.dashboardHeader);
        await this.verifyText(this.dashboardHeader, "Dashboard");
    }
}