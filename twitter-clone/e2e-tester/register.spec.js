import { test, expect } from '@playwright/test';

test('Registrera ny användare', async ({ page }) => {

  await page.goto('http://localhost:5173/sign-up');

  await page.fill('input[placeholder="Namn"]', 'testuser123');
  await page.fill('input[placeholder="Användarnamn"]', 'testuser');
  await page.fill('input[placeholder="E-post"]', 'testuser123@example.com');
  await page.fill('input[placeholder="Lösenord"]', 'Superhemligt123!');
  await page.fill('input[placeholder="Repetera lösenord"]', 'Superhemligt123!');

  await page.click('input#saveUser');
  
  await expect(page.locator('text=Logga in på Twitter')).toBeVisible();
});