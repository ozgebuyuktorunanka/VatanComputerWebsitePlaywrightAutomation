import logger from '../logger/logger_winston.js';

export class BasePage {
    constructor(page) {
      this.page = page;
      this.logger = logger;
    }
  
    async goto(url) {
      await this.page.goto(url);
      this.logger.info(`Navigated to: ${url}`);
    }
  
    async waitForPageLoad() {
      await this.page.waitForLoadState('domcontentloaded');
    }
  
    async handleCookieConsent() {
      const acceptCookiesBtn = await this.page.getByRole('button', { name: 'Tümünü Kabul Et' });
      if (await acceptCookiesBtn.isVisible()) {
        await acceptCookiesBtn.click();
        this.logger.info('Cookie consent accepted');
      }
    }
  }