import { test, expect } from '@playwright/test';
import { VatanBilgisayarPage } from '../../src/helpers/helperFunctions.js';
import logger from '../../src/logger/logger_winston.js';
import { TEST_DATA } from '../../src/data/testData.js';
import { LoginTest } from '../../src/tests/LoginTest.js'; 

// Alternative Test Scenario: Single test with all steps combined
test.describe('Vatan Bilgisayar Complete E2E Journey - All Steps in One Test', () => {
    test('Complete shopping journey from login to cart empty', async ({ browser }) => {
        logger.info('🚀 Starting complete E2E journey in single test execution');
        
        // Initialize browser context and page
        const context = await browser.newContext();
        const page = await context.newPage();
        const vatanPage = new VatanBilgisayarPage(page);
        const loginTest = new LoginTest();
        
        try {
            // Step 1: Setup and Login
            await loginTest.executeHappyPathLogin(page, context);
            
            // Step 2: Search and Browse
            logger.info('🔍 Step 2: Product search and browsing');
            await vatanPage.searchProduct(TEST_DATA.searchTerm);
            await vatanPage.filterByPhoneCategory();
            await vatanPage.verifySearchResults();
            await vatanPage.navigateToPage2();
            await expect(vatanPage.page).toHaveURL(/page=2/);
            logger.info('✅ Product search and browsing completed');
            
            // Step 3: Favorites Management
            logger.info('⭐ Step 3: Favorites management');
            await vatanPage.selectProduct('(2) SM-S938BZKDTUR Samsung');
            await vatanPage.addToFavorites();
            logger.info('✅ Product added to favorites');
            
            // Step 4: Cart Operations
            logger.info('🛒 Step 4: Shopping cart operations');
            await vatanPage.goToFavorites();
            await vatanPage.addFavoriteToCart();
            logger.info('✅ Product added to cart from favorites');
            
            // Step 5: Checkout Process
            logger.info('💳 Step 5: Checkout and delivery');
            await vatanPage.goToCart();
            await vatanPage.proceedToCheckout();
            await vatanPage.addDeliveryAddress();
            logger.info('✅ Checkout process completed');
            
            // Step 6: Cleanup
            logger.info('🗑️ Step 6: Cart cleanup');
            await vatanPage.emptyCart();
            await vatanPage.startShopping();
            logger.info('✅ Cart emptied successfully');
            
            logger.info('🎉 Complete E2E journey finished successfully!');
        } catch (error) {
            logger.error(`❌ Test failed at step: ${error.message}`);
            throw error; // Rethrow the error to ensure the test fails
        } finally {
            // Always cleanup
            await context.close();
            logger.info('🧹 Browser session closed');
        }
    });
});