
import { test, expect } from '@playwright/test';

test('login flow E2E', async ({ page }) => {
  
  await page.goto('http://localhost:3000/login'); 


  await page.fill('input[placeholder="E-postadress eller användarnamn"]', 'nina@live.se');
  await page.click('button:has-text("Nästa")');

  await expect(page).toHaveURL(/\/login\/password/);


  await page.fill('input[placeholder="Lösenord"]', 'Nina123!');
  await page.click('button.LoggaIn');

 
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  await expect(page.locator('text=Välkommen')).toBeVisible(); 
});
