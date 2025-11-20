import { test, expect } from '@playwright/test';

test.describe('V2.0 Environment Tests', () => {
  test('should load page and render 3D canvas', async ({ page }) => {
    await page.goto('/');
    
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
  });

  test('should display environment without errors', async ({ page }) => {
    await page.goto('/');
    
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.waitForTimeout(2000);
    
    expect(errors.filter(e => !e.includes('ResizeObserver'))).toHaveLength(0);
  });

  test('should toggle day/night mode', async ({ page }) => {
    await page.goto('/');
    
    const toggleButton = page.getByRole('button', { name: /night|day/i });
    if (await toggleButton.isVisible()) {
      await toggleButton.click();
      await page.waitForTimeout(500);
      await toggleButton.click();
    }
  });
});
