// @ts-check
import { test, expect } from '@playwright/test';

/**
 * To generate the snapshots, run: 
 *      npx playwright test visual.spec.js --update-snapshots
 * Otherwise, it will fail the first time.
 * 
 * Then:
 * 1. Delete home-page-auth-chromium-win32.png
 * 2. Copy home-page-no-auth-chromium-win32.png to home-page-auth-chromium-win32.png
 * 3. Run the test without updating the snapshots:
 *      npx playwright test visual.spec.js
 * 
 * Check out the error report, section "Errors": it shows the actual output,
 * the expected one, the difference between them, both side by side, and the slider
 */

/**
 * Waits for all the images to load.
 * It should be run before any assertion, as webkit usually causes trouble
 */
const waitForImageLoad = async ({ page }) => {
    await page.evaluate(async () => {
        await Promise.all(Array.from(document.images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.addEventListener('load', resolve);
                img.addEventListener('error', resolve);
            });
        }));
    });
};

test.describe('Home page no auth', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');
    });

    test('visual test', async({ page }) => {
        await waitForImageLoad({ page });
        await expect(page).toHaveScreenshot('home-page-no-auth.png');
    });
});

test.describe('Home page customer 02 auth', async () => {
    test.use({ storageState: '.auth/customer02.json' });
    test.beforeEach(async ({ page }) => {
        await page.goto('');
    });
    test('check customer 02 is signed in', async ({ page }) => {
        await waitForImageLoad({ page });
        await expect(page).toHaveScreenshot('home-page-auth.png');
    });
});