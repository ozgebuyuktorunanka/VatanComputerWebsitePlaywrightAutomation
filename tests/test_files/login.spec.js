import { test as base } from '@playwright/test';
import { LoginTest } from '../../src/loginClass/LoginTest';
import logger from '../../src/logger/logger_winston';

// Custom fixture
const test = base.extend({
  authenticatedContext: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      userAgent: 'Only Login Scenario',
      extraHTTPHeaders: {
        'Accept-Language': 'tr-TR,tr;q=0.9,en;q=0.8'
      }
    });

    await use(context);
    await context.close();
  },

  authenticatedPage: async ({ authenticatedContext }, use) => {
    const page = await authenticatedContext.newPage();
    await use(page);
  }
});

test.describe.configure({ mode: 'serial' });
test.describe('Step-1: Successful Login Process', () => {

  test.beforeAll(async () => {
    test.setTimeout(120000);
    logger.info('🚀 This Scenario is running: Step-1: Successful Login Process');
  });

  test('Happy Path - User logs in via Google and verifies homepage elements',
    async ({ authenticatedPage, authenticatedContext }) => {
      const loginTest = new LoginTest();
      await loginTest.executeHappyPathLogin(authenticatedPage, authenticatedContext);
    }
  );
});