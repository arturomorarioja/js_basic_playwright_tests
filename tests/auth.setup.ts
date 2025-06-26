import { test as setup, expect } from '@playwright/test';

setup('Create a customer 02 auth', async ({ page, context }) => {
    const email = 'customer2@practicesoftwaretesting.com';
    const password = 'welcome01';
    const customer02AuthFile = '.auth/customer02.json';

    await page.goto('auth/login');

    await page.getByTestId('email').fill(email);
    await page.getByTestId('password').fill(password);
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('nav-menu')).toContainText('Jack Howe');
    // Cookie information is written in a JSON file for later reuse
    await context.storageState({ path: customer02AuthFile });
});