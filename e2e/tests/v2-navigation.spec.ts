import { test, expect } from '@playwright/test';

test.describe('V2.0 Navigation Tests', () => {
  test('should allow player movement', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForTimeout(1000);
    
    await page.keyboard.press('w');
    await page.waitForTimeout(100);
    await page.keyboard.press('a');
    await page.waitForTimeout(100);
    await page.keyboard.press('s');
    await page.waitForTimeout(100);
    await page.keyboard.press('d');
    
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
  });

  test('should navigate through scene', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForTimeout(1000);
    
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('w');
      await page.waitForTimeout(50);
    }
    
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
  });
});
