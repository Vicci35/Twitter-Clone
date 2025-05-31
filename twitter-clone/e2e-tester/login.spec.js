import { test, expect } from '@playwright/test';

test('login flow E2E', async ({ page }) => {
  
  await page.goto('http://localhost:5173');
  
  await page.fill('input[placeholder="E-postadress eller användarnamn"]', 'nina@live.se');
  await page.click('button.next');

  await expect(page).toHaveURL(/\/login\/password/);

  await page.fill('input[placeholder="Lösenord"]', 'Nina123!');
  await page.click('button.LoggaIn');

  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('text=Nina123')).toBeVisible(); 
});
