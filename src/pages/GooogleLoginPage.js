import { BasePage } from './BasePage.js';

export class GoogleLoginPage extends BasePage {
    constructor(page) {
      super(page);
      
      // Selectors
      this.selectors = {
        googleIframe: 'iframe[title="Google ile Oturum Açma Düğmesi"]',
        googleLoginBtn: 'button[name="Google ile oturum açın"]',
        emailInput: 'textbox[name="Email or phone"]',
        passwordInput: 'textbox[name="Enter your password"]',
        nextButton: 'button[name="Next"]'
      };
    }
  
    async initializeGoogleLogin() {
      const iframeLocator = this.page.frameLocator(this.selectors.googleIframe);
      const popupPromise = this.page.waitForEvent('popup');
      
      await iframeLocator
        .getByRole('button', { name: 'Google ile oturum açın' })
        .click();
      
      this.logger.info('Google login initiated');
      return popupPromise;
    }
    async performGoogleLogin(popup, credentials) {
        await popup.waitForLoadState('domcontentloaded');
        this.logger.info('Google login popup loaded');
    
        // Enter email
        await popup.getByRole('textbox', { name: 'Email or phone' }).fill(credentials.email);
        await popup.getByRole('button', { name: 'Next' }).click();
        this.logger.info('Email entered and Next clicked');
    
        // Enter password
        await popup.getByRole('textbox', { name: 'Enter your password' }).fill(credentials.password);
        await popup.getByRole('button', { name: 'Next' }).click();
        this.logger.info('Password entered and Next clicked');
    
        // Wait for popup to close (indicating successful login)
        await popup.waitForEvent('close');
        this.logger.info('Google login completed - popup closed');
      }
    }
  