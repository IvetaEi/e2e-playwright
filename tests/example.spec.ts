import { test, expect } from '@playwright/test';

test('Check if login is protected by captcha', async ({ page }) => {
  await page.goto('https://www.vinted.lt/');
  await page.getByRole('button', { name: 'Priimti visus' }).click();
  await page.getByTestId('header--login-button').click();
  await page.getByTestId('auth-select-type--register-switch').click();
  await page.getByTestId('auth-select-type--login-email').click();

  await page.getByPlaceholder('El. paštas arba vartotojo vardas').fill('Slapyvardis');
  await page.getByPlaceholder('Slaptažodis').fill('Slaptazodis');

  await page.getByRole('button', { name: 'Tęsti' }).click();
  await expect(page.frameLocator('body iframe').nth(4).locator('#captcha__frame')).toBeVisible();
});

test('Item search works', async ({ page }) => {
  await page.goto('https://www.vinted.lt/');
  await page.getByRole('button', { name: 'Priimti visus' }).click();
  await page.getByRole('textbox', { name: 'Prekės' }).fill('Batai');
  await page.keyboard.press('Enter');

  await page.locator('.feed-grid__item-content').first().click();
  await  expect(page.getByTestId('item-buy-button')).toBeVisible();  
});

