
import { HomePage } from '../pages/HomePage.js';
import { GoogleLoginPage } from '../pages/GooogleLoginPage.js'
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
      const googleLoginPage = new GoogleLoginPage(page);

      // Get test credentials
      const credentials = this.authService.getTestCredentials();

      // Step 1: Navigate to homepage
      await homePage.navigateToHomePage();

      // Step 2: Click login button and navigate to login
      await homePage.clickHeaderLoginButton();
      await homePage.clickLoginLink();

      // Step 3: Perform Google login
      const popupPromise = await googleLoginPage.initializeGoogleLogin();
      const popup = await popupPromise;
      await googleLoginPage.performGoogleLogin(popup, credentials);

      // Step 4: Wait for main page to update
      await homePage.waitForPageLoad();

      // Step 5: Refresh homepage to reflect login state
      await homePage.refreshToReflectLoginState();

      // Step 6: Verify successful login
      await homePage.verifyUserLoggedIn();
      await homePage.verifyHomepageLogo();

      logger.info('Happy path login test completed successfully');
      return true;

    } catch (error) {
      logger.error('Login test failed:', error);
      throw error;
    }
  }

  async executeNegativePathLogin(page, context) {
    try{

    }catch(e){
      
    }
  }
}
