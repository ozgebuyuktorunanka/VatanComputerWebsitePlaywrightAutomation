import { test } from '@playwright/test';
import { LoginTest } from '../../src/tests/LoginTest.js'; 

test.describe('Step-1: Successful Login Process', () => {
  test('Happy Path - User logs in via Google and verifies homepage elements', async ({ page, context }) => {
    const loginTest = new LoginTest();
    await loginTest.executeHappyPathLogin(page, context);
  });
});