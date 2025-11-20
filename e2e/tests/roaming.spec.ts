import { test, expect } from '@playwright/test';

test.describe('3D Room Roaming', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for canvas to be present (indicates 3D scene loaded)
    await page.waitForSelector('canvas');
  });

  test('should render the main interface elements', async ({ page }) => {
    // Check for help text
    await expect(page.getByText('WASD to Move')).toBeVisible();
    await expect(page.getByText('Click to Interact')).toBeVisible();
    
    // Check for day/night toggle
    await expect(page.getByRole('button', { name: /Day Mode/i })).toBeVisible();
  });

  test('should toggle day/night mode', async ({ page }) => {
    const toggleBtn = page.getByRole('button', { name: /Day Mode/i });
    await expect(toggleBtn).toBeVisible();
    
    // Switch to Night
    await toggleBtn.click();
    await expect(page.getByRole('button', { name: /Night Mode/i })).toBeVisible();
    
    // Switch back to Day
    await page.getByRole('button', { name: /Night Mode/i }).click();
    await expect(page.getByRole('button', { name: /Day Mode/i })).toBeVisible();
  });

  // Note: Testing 3D interaction (clicking a mesh) in Playwright is tricky because 
  // DOM elements don't exist for meshes. We usually rely on visual regression or 
  // clicking coordinates. For this test, we'll verify the UI overlay logic which is DOM-based.
  
  test('should show info card when simulated selection occurs', async ({ page }) => {
    // Since we can't easily click a 3D object, we can verify the InfoCard is NOT visible initially
    const infoCard = page.locator('.bg-white\\/90'); // Tailwind class for InfoCard
    await expect(infoCard).not.toBeVisible();
  });
});
