import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.url = process.env.BASEURL;
    
    // Selectors
    this.selectors = {
      headerLoginBtn: 'button[name=" Giriş Yap "]',
      loginLink: 'link[name="Giriş Yap"]',
      accountButton: '#btnMyAccount',
      logoLink: 'link[name="Vatan Bilgisayar"]'
    };
  }

  async navigateToHomePage() {
    await this.goto(this.url);
    await this.handleCookieConsent();
  }

  async clickHeaderLoginButton() {
    const headerLoginBtn = this.page.getByRole('button', { name: ' Giriş Yap ' });
    await expect(headerLoginBtn).toBeVisible();
    await headerLoginBtn.click();
    this.logger.info('Header login button clicked');
  }

  async clickLoginLink() {
    await this.page.getByRole('link', { name: 'Giriş Yap' }).click();
    this.logger.info('Login link clicked');
  }

  async verifyUserLoggedIn() {
    const accountButton = this.page.locator(this.selectors.accountButton);
    await expect(accountButton).toBeVisible();
    this.logger.info('User login verified - Account button visible');
    return true;
  }

  async verifyHomepageLogo() {
    const logoLink = this.page.getByRole('link', { name: 'Vatan Bilgisayar' });

    //with control logolink- Control the verify home page. 
    //Assertions
    await expect(logoLink).toBeVisible();
    this.logger.info('Homepage logo verified');
    return true;
  }

  async refreshToReflectLoginState() {
    await this.goto(this.url);
    await this.waitForPageLoad();
  }
}