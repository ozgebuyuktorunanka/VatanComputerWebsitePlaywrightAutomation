import { test, expect } from '@playwright/test';
import { VatanBilgisayarPage } from '../../src/helpers/helperFunctions.js';
import logger from '../../src/logger/logger_winston.js';
import { TEST_DATA } from '../../src/data/testData.js';
import { LoginTest } from '../../src/tests/LoginTest.js'; 


// Single Browser Session Test Suite
test.describe.serial('Vatan Bilgisayar Complete E2E Journey - Single Session', () => {
    //Global Variable
    let vatanPage;
    let context;
    let page;

    // Setup: Initialize browser context and page once
    test.beforeAll(async ({ browser }) => {
        logger.info('🚀 Starting single browser session for complete E2E journey');

        // Create persistent context to maintain session
        context = await browser.newContext();
        page = await context.newPage();
        vatanPage = new VatanBilgisayarPage(page);
        const loginTest = new LoginTest();

        await loginTest.executeHappyPathLogin(page, context);
    });

    test('Step 1: Search and Browse Products', async () => {
        test.setTimeout(120000);

        logger.info('🔍 Step 1: Starting product search and browsing');

        logger.info('Searching for Samsung products');
        await vatanPage.searchProduct(TEST_DATA.searchTerm);

        logger.info('Filtering by phone category');
        await vatanPage.filterByPhoneCategory();

        logger.info('Verifying search results');
        await vatanPage.verifySearchResults();
        logger.info('Samsung products searched and filtered successfully.');
    });

    test('Step 2: Navigate Through Search Results', async () => {
        logger.info('📄 Step 2: Navigating through search result pages');

        logger.info('Navigating to page 2 of search results');
        await vatanPage.navigateToPage2();

        // Verify we're on page 2
        await expect(vatanPage.page).toHaveURL(/page=2/);
        logger.info('✅ Successfully navigated to page 2 of search results.');
    });

    test('Step 3: Add Product to Favorites', async () => {
        logger.info('⭐ Step 3: Adding product to favorites');

        logger.info('Selecting Samsung Galaxy S25 Ultra product');
        await vatanPage.selectProduct('(2) SM-S938BZKDTUR Samsung');

        logger.info('Adding product to favorites list');
        await vatanPage.addToFavorites();
        logger.info('✅ Product added to favorites successfully.');
    });

    test('Step 4: View Favorites and Add to Cart', async () => {
        logger.info('🛒 Step 4: Viewing favorites and adding to cart');

        logger.info('Navigating to favorites page');
        await vatanPage.goToFavorites();

        logger.info('Adding favorite product to shopping cart');
        await vatanPage.addFavoriteToCart();
        logger.info('✅ Favorite product added to cart successfully.');
    });

    test('Step 5: Proceed Through Checkout Process', async () => {
        logger.info('💳 Step 5: Proceeding through checkout process');

        logger.info('Navigating to shopping cart');
        await vatanPage.goToCart();

        logger.info('Starting checkout process');
        await vatanPage.proceedToCheckout();

        logger.info('Adding delivery address information');
        await vatanPage.addDeliveryAddress();
        logger.info('✅ Checkout process completed successfully.');
    });

    test('Step 6: Empty Cart and Complete Journey', async () => {
        logger.info('🗑️ Step 6: Emptying cart and completing the journey');

        logger.info('Emptying the shopping cart');
        await vatanPage.emptyCart();

        logger.info('Starting new shopping session');
        await vatanPage.startShopping();
        logger.info('✅ Cart emptied and ready for new shopping session.');

        logger.info('🎉 Complete E2E journey finished successfully!');
    });

    // Cleanup: Close browser context after all tests
    test.afterAll(async () => {
        logger.info('🧹 Cleaning up: Closing browser context and page');
        if (context) {
            await context.close();
        }
        logger.info('✅ Browser session closed successfully');
    });
});

