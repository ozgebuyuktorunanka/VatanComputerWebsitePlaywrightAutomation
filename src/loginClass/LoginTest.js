
import { HomePage } from '../pages/HomePage.js';
import { AuthService } from '../services/AuthService.js';
import logger from '../logger/logger_winston';

export class LoginTest {
  constructor() {
    this.authService = new AuthService();
  }

  async executeHappyPathLogin(page, context) {
    try {
      // Initialize page objects
      const homePage = new HomePage(page);

      // Step 1: Navigate to homepage
      await homePage.navigateToHomePage();

      // Step 2: Click login button and navigate to login
      await homePage.controlHeaderLoginButton();
      // Step 4: Wait for main page to update
      await homePage.waitForPageLoad();

      // Step 5: Verify successful login
      await homePage.verifyUserLoggedIn();
      await homePage.verifyHomepageLogo();

      logger.info('Happy path login test completed successfully');
      return true;

    } catch (error) {
      logger.error('Login test failed:', error);
      throw error;
    }
  }

}
