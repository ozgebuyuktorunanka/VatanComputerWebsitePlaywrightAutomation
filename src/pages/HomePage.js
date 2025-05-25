import { waitForAwhile } from '../helpers/waitHelper.js';
import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';
import { AuthService } from '../services/AuthService.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.url = process.env.BASEURL;

    // Selectors
    this.selectors = {
      headerLoginBtn: 'button[name=" Giriş Yap "]',
      loginLink: "//button[@id='login-button']",
      accountButton: "//button[@id='btnMyAccount']",
      logoLink: 'link[name="Vatan Bilgisayar"]',
      emailField: "//input[@id='email']",
      passwordField: "//input[@id='pass']"
    };
  }

  async navigateToHomePage() {
    await this.goto(this.url);
    await this.handleCookieConsent();
  }

  async controlHeaderLoginButton() {
    const authService = new AuthService();
    const { email, password } = authService.getTestCredentials();

    try {
      const accountButtonLocator = this.page.locator(this.selectors.accountButton);
      await expect(accountButtonLocator).toBeVisible();
      await accountButtonLocator.click();

      await this.page.getByRole('link', { name: 'Giriş Yap' }).click();
      await waitForAwhile(this.page, 3000);

      const emailFieldLocator = this.page.locator(this.selectors.emailField);
      await expect(emailFieldLocator).toBeVisible();
      await emailFieldLocator.click();
      await emailFieldLocator.fill(email);

      const passwordFieldLocator = this.page.locator(this.selectors.passwordField);
      await expect(passwordFieldLocator).toBeVisible();
      await passwordFieldLocator.click();
      await passwordFieldLocator.fill(password);

      const headerLoginBtn = this.page.locator(this.selectors.loginLink);
      await expect(headerLoginBtn).toBeVisible();
      await headerLoginBtn.click();

      this.logger.info('Login link clicked');
    } catch (e) {
      this.logger.error(`In controlHeaderLoginButton method gives a error: details-> ${e.message}`);
    }
  }


  async verifyUserLoggedIn() {
    const accountButton = await this.page.locator(this.selectors.accountButton);
    await expect(accountButton).toBeVisible();
    this.logger.info('User login verified - Account button visible');
    return true;
  }

  async verifyHomepageLogo() {
    const logoLink = await this.page.getByRole('link', { name: 'Vatan Bilgisayar' });

    //with control logolink- Control the verify home page. 
    //Assertions
    await expect(logoLink).toBeVisible();
    this.logger.info('Homepage logo verified');
    return true;
  }

}