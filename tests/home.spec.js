// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Home page no auth', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');
    });

    test('check sign in', async ({ page }) => {
        
        // Notice that the default test ID has been changed in playwright.config.js,
        // section use: { testIdAttribute }
        await expect(page.getByTestId('nav-sign-in')).toHaveText('Sign in');
    });

    test('validate page title', async ({ page }) => {
        await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
    });

    test('count items', async ({ page }) => {
        const productGrid = page.locator('.col-md-9');
        
        // Example of a locator assertion (Playwright will retry upon failure)
        await expect(productGrid.getByRole('link')).toHaveCount(9);
        
        // Example of a value assertion (no implicit wait)
        expect(await productGrid.getByRole('link').count()).toBe(9);
    });

    test('search for product', async ({ page }) => {
        const productGrid = page.locator('.col-md-9');
        await page.getByTestId('search-query').fill('Thor Hammer');
        await page.getByTestId('search-submit').click();
        await expect(productGrid.getByRole('link')).toHaveCount(1);
        await expect(page.getByAltText('Thor Hammer')).toBeVisible();
    });
});

test.describe('Home page customer 02 auth', () => {
    test.use({ storageState: '.auth/customer02.json' });
    test.beforeEach(async ({ page }) => {
        await page.goto('');
    });

    test('check customer 02 is signed in', async ({ page }) => {
        await expect(page.getByTestId('nav-sign-in')).not.toBeVisible();
        await expect(page.getByTestId('nav-menu')).toContainText('Jack Howe');
    });
});