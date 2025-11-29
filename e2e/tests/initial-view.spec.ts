import { test, expect } from '@playwright/test';

test.describe('Initial View Tests', () => {
  test('should show house immediately on page load', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    // Wait for canvas to be present
    await page.waitForSelector('canvas', { timeout: 10000 });
    
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    
    // Check if welcome screen is visible initially
    const welcomeTitle = page.locator('text=Premium Double Floor House');
    await expect(welcomeTitle).toBeVisible();
  });

  test('should allow starting the tour', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    const tourButton = page.locator('button:has-text("Guided Tour")');
    await tourButton.click();
    
    // Check if tour controls appear
    await expect(page.locator('text=Welcome to Your Dream Home')).toBeVisible();
    await expect(page.locator('button:has-text("Skip Tour")')).toBeVisible();
  });
});
