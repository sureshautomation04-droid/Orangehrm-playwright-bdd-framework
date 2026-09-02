import { Page, Locator, expect, FrameLocator, ElementHandle } from '@playwright/test';

export default class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // ============================================================
    // NAVIGATION METHODS
    // ============================================================

    // Navigate to URL
    async navigate(url: string, options?: { timeout?: number; waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit' }): Promise<void> {
        try {
            await this.page.goto(url, {
                waitUntil: options?.waitUntil || 'domcontentloaded',
                timeout: options?.timeout || 60000
            });
            console.log(`Successfully navigated to: ${url}`);
        } catch (error) {
            console.error(`Failed to navigate to: ${url}`);
            console.error(error);
            throw error;
        }
    }

    // Go back
    async goBack(): Promise<void> {
        try {
            await this.page.goBack();
            console.log('Navigated back successfully');
        } catch (error) {
            console.error('Failed to navigate back');
            console.error(error);
            throw error;
        }
    }

    // Go forward
    async goForward(): Promise<void> {
        try {
            await this.page.goForward();
            console.log('Navigated forward successfully');
        } catch (error) {
            console.error('Failed to navigate forward');
            console.error(error);
            throw error;
        }
    }

    // Reload page
    async reload(): Promise<void> {
        try {
            await this.page.reload();
            console.log('Page reloaded successfully');
        } catch (error) {
            console.error('Failed to reload page');
            console.error(error);
            throw error;
        }
    }

    // Get current URL
    async getCurrentURL(): Promise<string> {
        try {
            const url = this.page.url();
            console.log(`Current URL: ${url}`);
            return url;
        } catch (error) {
            console.error('Failed to get current URL');
            console.error(error);
            throw error;
        }
    }


    // ============================================================
    // CLICK METHODS
    // ============================================================

    // Click
    async click(locator: Locator): Promise<void> {
        try {
            await locator.focus();
            await locator.click();
            console.log('Element clicked successfully');
        } catch (error) {
            console.error('Failed to click element');
            console.error(error);
            throw error;
        }
    }

    // Double click
    async doubleClick(locator: Locator): Promise<void> {
        try {
            await locator.focus();
            await locator.dblclick();
            console.log('Element double-clicked successfully');
        } catch (error) {
            console.error('Failed to double-click element');
            console.error(error);
            throw error;
        }
    }

    // Right click
    async rightClick(locator: Locator): Promise<void> {
        try {
            await locator.focus();
            await locator.click({
                button: 'right'
            });
            console.log('Right click successful');
        } catch (error) {
            console.error('Failed to right click element');
            console.error(error);
            throw error;
        }
    }


    // ============================================================
    // TEXTBOX METHODS
    // ============================================================

    // Fill textbox
    async fill(locator: Locator, value: string): Promise<void> {
        try {
            await locator.focus();
            await locator.fill(value);
            console.log(`Successfully entered value: ${value}`);
        } catch (error) {
            console.error(`Failed to enter value: ${value}`);
            console.error(error);
            throw error;
        }
    }

    // Clear textbox
    async clear(locator: Locator): Promise<void> {
        try {
            await locator.focus();
            await locator.clear();
            console.log('Element cleared successfully');
        } catch (error) {
            console.error('Failed to clear element');
            console.error(error);
            throw error;
        }
    }

    // Type text
    async pressSequentially(locator: Locator, value: string): Promise<void> {
        try {
            await locator.focus();
            await locator.pressSequentially(value);
            console.log(`Text typed successfully: ${value}`);
        } catch (error) {
            console.error(`Failed to type text: ${value}`);
            console.error(error);
            throw error;
        }
    }

    // Type text using keyboard

    async type(locator: Locator, value: string): Promise<void> {
        try {
            await locator.focus();
            await locator.click();
            await locator.page().keyboard.type(value);
            console.log(`Text typed successfully: ${value}`);
        } catch (error) {
            console.error(`Failed to type text: ${value}`);
            console.error(error);
            throw error;
        }

    }


    // ============================================================
    // TEXT METHODS
    // ============================================================

    // Get inner text
    async getText(locator: Locator): Promise<string> {
        try {
            await locator.focus();
            const text = await locator.innerText();
            console.log(`Text retrieved: ${text}`);
            return text;
        } catch (error) {
            console.error('Failed to retrieve text');
            console.error(error);
            throw error;
        }
    }

    // Get input value
    async getInputValue(locator: Locator): Promise<string> {
        try {
            await locator.focus();
            const value = await locator.inputValue();
            //console.log(`Input value: ${value}`);
            return value.trim();
        } catch (error) {
            console.error('Failed to get input value');
            console.error(error);
            throw error;
        }
    }

    // Get attribute
    async getAttribute(locator: Locator, attribute: string): Promise<string | null> {
        try {
            await locator.focus();
            const value = await locator.getAttribute(attribute);
            console.log(`Attribute ${attribute}: ${value}`);
            return value;
        } catch (error) {
            console.error(`Failed to get attribute: ${attribute}`);
            console.error(error);
            throw error;
        }
    }


    // ============================================================
    // HOVER METHODS
    // ============================================================

    async hover(locator: Locator): Promise<void> {
        try {
            await locator.focus();
            await locator.hover();
            console.log('Element hovered successfully');
        } catch (error) {
            console.error('Failed to hover element');
            console.error(error);
            throw error;
        }
    }


    // ============================================================
    // CHECKBOX / RADIO METHODS
    // ============================================================

    // Check checkbox
    async check(locator: Locator): Promise<void> {
        try {
            await locator.focus();
            await locator.check();
            console.log('Checkbox checked successfully');
        } catch (error) {
            console.error('Failed to check checkbox');
            console.error(error);
            throw error;
        }
    }

    // Uncheck checkbox
    async uncheck(locator: Locator): Promise<void> {
        try {
            await locator.focus();
            await locator.uncheck();
            console.log('Checkbox unchecked successfully');
        } catch (error) {
            console.error('Failed to uncheck checkbox');
            console.error(error);
            throw error;
        }
    }

    // Check radio button
    async selectRadio(locator: Locator): Promise<void> {
        try {
            await locator.focus();
            await locator.check();
            console.log('Radio button selected successfully');
        } catch (error) {
            // Handle case where custom styled wrapper intercepts pointer events
            console.log('Checkbox method failed, trying click on visible element...');
            try {
                await locator.click({ force: true });
                console.log('Radio button selected via click');
            } catch (clickError) {
                console.error('Failed to select radio button');
                console.error(clickError);
                throw clickError;
            }
        }
    }

    // Verify checkbox checked
    async verifyChecked(locator: Locator): Promise<void> {
        try {
            await locator.focus();
            await expect(locator).toBeChecked();
            console.log('Checkbox is checked');
        } catch (error) {
            console.error('Checkbox is not checked');
            console.error(error);
            throw error;
        }
    }


    // ============================================================
    // DROPDOWN METHODS
    // ============================================================

    // Select dropdown by value
    async selectOption(locator: Locator, value: string): Promise<void> {
        try {
            await locator.focus();
            await locator.selectOption(value);
            console.log(`Selected option: ${value}`);
        } catch (error) {
            console.error(`Failed to select option: ${value}`);
            console.error(error);
            throw error;
        }
    }

    // Select dropdown by label
    async selectByLabel(locator: Locator, label: string): Promise<void> {
        try {
            await locator.focus();
            await locator.selectOption({
                label: label
            });

            console.log(`Selected label: ${label}`);
        } catch (error) {
            console.error(
                `Failed to select label: ${label}`
            );
            console.error(error);
            throw error;
        }
    }
    // customDropdown
   async customDropdown(
    dropdown: Locator,
    option: string
): Promise<void> {
    try {
        await dropdown.focus();
        await dropdown.click();

        const optionLocator = this.page.locator('.oxd-select-option').filter({ hasText: option }).first();
        await optionLocator.focus();
        await optionLocator.waitFor({ state: 'visible'});
        await optionLocator.click();

        console.log(
            `Successfully selected dropdown option: ${option}`
        );

    } catch (error) {
        console.error(
            `Failed to select dropdown option: ${option}`
        );
        console.error(error);

        throw error;
    }
}

    // ============================================================
    // VERIFICATION METHODS
    // ============================================================


    async verifyEqual(locator: Locator, expectedValue: string): Promise<void> {
        try {
            await locator.focus();
            let actualValue = '';
            const tagName = await locator.evaluate(el => el.tagName.toLowerCase());
            if (tagName === 'input' || tagName === 'textarea') {
                actualValue = await locator.inputValue();
            } else {
                actualValue = await locator.innerText();
            }
            expect(actualValue.trim()).toBe(expectedValue);
            console.log(`Text verified successfully: ${expectedValue}`);
        } catch (error) {
            console.error(
                `Text verification failed. Expected: ${expectedValue}`
            );
            throw error;
        }
    }

    // Verify visible
    async verifyVisible(locator: Locator): Promise<void> {
        try {
            await locator.focus();
            await expect(locator).toBeVisible();
            console.log('Element is visible');
        } catch (error) {
            console.error('Element is not visible');
            console.error(error);
            throw error;
        }
    }

    // Verify hidden
    async verifyHidden(locator: Locator): Promise<void> {
        try {
            await locator.focus();
            await expect(locator).toBeHidden();
            console.log('Element is hidden');
        } catch (error) {
            console.error('Element is not hidden');
            console.error(error);
            throw error;
        }
    }

    // Verify enabled
    async verifyEnabled(locator: Locator): Promise<void> {
        try {
            await locator.focus();
            await expect(locator).toBeEnabled();
            console.log('Element is enabled');
        } catch (error) {
            console.error('Element is not enabled');
            console.error(error);
            throw error;
        }
    }

    // Verify disabled
    async verifyDisabled(locator: Locator): Promise<void> {
        try {
            await locator.focus();
            await expect(locator).toBeDisabled();
            console.log('Element is disabled');
        } catch (error) {
            console.error('Element is not disabled');
            console.error(error);
            throw error;
        }
    }

    // Verify text
    async verifyText(locator: Locator, expectedText: string): Promise<void> {
        try {
            await locator.focus();
            await expect(locator).toHaveText(expectedText);
            console.log(`Text verified successfully: ${expectedText}`);
        } catch (error) {
            console.error(`Text verification failed: ${expectedText}`);
            console.error(error);
            throw error;
        }
    }

    // Verify contains text
    async verifyContainsText(locator: Locator, expectedText: string): Promise<void> {
        try {
            await locator.focus();
            await expect(locator).toContainText(expectedText);
            console.log(`Element contains text: ${expectedText}`);
        } catch (error) {
            console.error(`Element does not contain text: ${expectedText}`);
            console.error(error);
            throw error;
        }
    }

    // Verify URL
    async verifyURL(url: string | RegExp): Promise<void> {
        try {
            await expect(this.page).toHaveURL(url);
            console.log('URL verification successful');
        } catch (error) {
            console.error('URL verification failed');
            console.error(error);
            throw error;
        }
    }


    // ============================================================
    // WAIT METHODS
    // ============================================================

    // Wait for element
    async waitForElement(locator: Locator): Promise<void> {
        try {
            await locator.waitFor({ state: 'visible', timeout: 30000 });
            console.log('Element is visible');
        } catch (error) {
            console.error('Element did not become visible');
            console.error(error);
            throw error;
        }
    }

    // Wait until element is attached to the DOM
    async waitForSelector(locator: Locator): Promise<void> {
        try {
            await locator.focus();
            await locator.waitFor({ state: 'attached', timeout: 30000 });
            console.log('Element is attached');
        } catch (error) {
            console.error('Element did not become attached');
            console.error(error);
            throw error;
        }
    }

    // Wait for element visible
    async waitForVisible(locator: Locator): Promise<void> {
        try {
            await locator.focus();
            await locator.waitFor({ state: 'visible' });
            console.log('Element is visible');
        } catch (error) {
            console.error('Element did not become visible');
            console.error(error);
            throw error;
        }
    }

    // Wait for element hidden
    async waitForHidden(locator: Locator): Promise<void> {
        try {
            await locator.focus();
            await locator.waitFor({ state: 'hidden' });
            console.log('Element is hidden');
        } catch (error) {
            console.error('Element did not become hidden');
            console.error(error);
            throw error;
        }
    }

    // Wait fixed time
    async wait(milliseconds: number): Promise<void> {
        try {
            await this.page.waitForTimeout(milliseconds);
            console.log(`Waited for ${milliseconds} milliseconds`);
        } catch (error) {
            console.error('Wait failed');
            console.error(error);
            throw error;
        }
    }


    // ============================================================
    // KEYBOARD METHODS
    // ============================================================

    // Press keyboard key
    async press(locator: Locator, key: string): Promise<void> {
        try {
            await locator.focus();
            await locator.press(key);
            console.log(`Pressed key: ${key}`);
        } catch (error) {
            console.error(`Failed to press key: ${key}`);
            console.error(error);
            throw error;
        }
    }

    // Press keyboard on page
    async pressKey(locator: Locator, key: string): Promise<void> {
        try {
            await locator.focus();
            await this.page.keyboard.press(key);
            console.log(`Focused element and pressed key: ${key}`);
        } catch (error) {
            console.error(`Failed to press key: ${key}`);
            console.error(error);
            throw error;
        }
    }


    // ============================================================
    // SCROLL METHODS
    // ============================================================

    // Scroll element into view
    async scrollIntoView(locator: Locator): Promise<void> {
        try {
            await locator.focus();
            await locator.scrollIntoViewIfNeeded();
            console.log(
                'Element scrolled into view successfully'
            );
        } catch (error) {
            console.error(
                'Failed to scroll element into view'
            );
            console.error(error);
            throw error;
        }
    }

    // Scroll page
    async scrollPage(
        x: number,
        y: number
    ): Promise<void> {
        try {
            await this.page.mouse.wheel(x, y);

            console.log(
                `Page scrolled: x=${x}, y=${y}`
            );
        } catch (error) {
            console.error('Failed to scroll page');
            console.error(error);
            throw error;
        }
    }


    // ============================================================
    // ELEMENT COUNT
    // ============================================================

    // Get element count
    async getCount(locator: Locator): Promise<number> {
        try {
            await locator.focus();
            const count = await locator.count();
            console.log(`Element count: ${count}`);
            return count;
        } catch (error) {
            console.error('Failed to get element count');
            console.error(error);
            throw error;
        }
    }


    // ============================================================
    // FRAME METHODS
    // ============================================================

    // Get frame locator
    getFrame(selector: string
    ): FrameLocator {
        try {
            return this.page.frameLocator(selector);
        } catch (error) {
            console.error(
                `Failed to get frame: ${selector}`
            );
            console.error(error);
            throw error;
        }
    }


    // ============================================================
    // ELEMENT HANDLE
    // ============================================================

    async getElementHandle(
        locator: Locator
    ): Promise<ElementHandle<HTMLElement> | null> {
        try {
            await locator.focus();
            const element =
                await locator.elementHandle();

            console.log('Element handle retrieved');

            return element as ElementHandle<HTMLElement> | null;

        } catch (error) {
            console.error(
                'Failed to get element handle'
            );
            console.error(error);
            throw error;
        }
    }


    // ============================================================
    // SCREENSHOT
    // ============================================================

    async screenshot(name: string): Promise<void> {
        try {
            await this.page.screenshot({
                path: `screenshots/${name}.png`,
                fullPage: true
            });

            console.log(`Screenshot saved: ${name}.png`);

        } catch (error) {
            console.error(`Failed to take screenshot: ${name}`);
            console.error(error);
            throw error;
        }
    }


    // ============================================================
    // PAGE TITLE
    // ============================================================

    async getTitle(): Promise<string> {
        try {
            const title = await this.page.title();

            console.log(`Page title: ${title}`);

            return title;

        } catch (error) {
            console.error(
                'Failed to get page title'
            );
            console.error(error);
            throw error;
        }
    }

    // Verify page title
    async verifyTitle(
        expectedTitle: string
    ): Promise<void> {
        try {
            await expect(this.page)
                .toHaveTitle(expectedTitle);

            console.log(
                `Title verified: ${expectedTitle}`
            );

        } catch (error) {
            console.error(
                `Title verification failed: ${expectedTitle}`
            );
            console.error(error);
            throw error;
        }
    }


    // ============================================================
    // DIALOG METHODS
    // ============================================================

    // Accept alert
    async acceptDialog(): Promise<void> {
        try {
            this.page.once('dialog', async dialog => {
                console.log(
                    `Dialog message: ${dialog.message()}`
                );

                await dialog.accept();
            });

        } catch (error) {
            console.error(
                'Failed to accept dialog'
            );
            console.error(error);
            throw error;
        }
    }

    // Dismiss alert
    async dismissDialog(): Promise<void> {
        try {
            this.page.once('dialog', async dialog => {
                console.log(
                    `Dialog message: ${dialog.message()}`
                );

                await dialog.dismiss();
            });

        } catch (error) {
            console.error(
                'Failed to dismiss dialog'
            );
            console.error(error);
            throw error;
        }
    }


    // ============================================================
    // FILE UPLOAD
    // ============================================================

    async uploadFile(locator: Locator, filePath: string): Promise<void> {
        try {
            await locator.focus();
            await locator.setInputFiles(filePath);
            console.log(
                `File uploaded successfully: ${filePath}`
            );

        } catch (error) {
            console.error(
                `Failed to upload file: ${filePath}`
            );
            console.error(error);
            throw error;
        }
    }


    // ============================================================
    // FILE DOWNLOAD
    // ============================================================

    async downloadFile(
        locator: Locator,
        filePath: string
    ): Promise<void> {
        try {
            await locator.focus();
            const downloadPromise =
                this.page.waitForEvent('download');

            await locator.click();

            const download =
                await downloadPromise;

            await download.saveAs(filePath);

            console.log(
                `File downloaded successfully: ${filePath}`
            );

        } catch (error) {
            console.error(
                'Failed to download file'
            );
            console.error(error);
            throw error;
        }
    }
}