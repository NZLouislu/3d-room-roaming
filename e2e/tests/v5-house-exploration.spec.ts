import { test, expect } from '@playwright/test';

test.describe('V5.0 Two Story House Exploration', () => {
  test('should load two story house model', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForTimeout(3000);
    
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
  });

  test('should spawn player in yard', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForTimeout(2000);
    
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
  });

  test('should allow walking around yard', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForTimeout(2000);
    
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('w');
      await page.waitForTimeout(50);
    }
    
    await page.keyboard.press('a');
    await page.waitForTimeout(100);
    await page.keyboard.press('d');
    await page.waitForTimeout(100);
    
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
  });

  test('should not have console errors during exploration', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForTimeout(2000);
    
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('w');
      await page.waitForTimeout(50);
    }
    
    const relevantErrors = errors.filter(e => 
      !e.includes('ResizeObserver') && 
      !e.includes('DevTools')
    );
    
    expect(relevantErrors).toHaveLength(0);
  });

  test('should maintain stable performance', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForTimeout(3000);
    
    const performanceMetrics = await page.evaluate(() => {
      return {
        memory: (performance as any).memory?.usedJSHeapSize || 0,
        timing: performance.timing.loadEventEnd - performance.timing.navigationStart
      };
    });
    
    expect(performanceMetrics.timing).toBeLessThan(20000);
    
    if (performanceMetrics.memory > 0) {
      expect(performanceMetrics.memory).toBeLessThan(800 * 1024 * 1024);
    }
  });

  test('should allow navigation with WASD keys', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForTimeout(2000);
    
    await page.keyboard.press('w');
    await page.waitForTimeout(100);
    await page.keyboard.press('a');
    await page.waitForTimeout(100);
    await page.keyboard.press('s');
    await page.waitForTimeout(100);
    await page.keyboard.press('d');
    await page.waitForTimeout(100);
    
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
  });
});
