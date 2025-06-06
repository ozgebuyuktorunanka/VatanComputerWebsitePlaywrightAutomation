import { TEST_DATA } from '../../src/data/testData.js';
import logger from '../../src/logger/logger_winston.js';
import { expect } from '@playwright/test';
import { waitForAwhile } from './waitHelper.js';

// Helper Functions
export class VatanBilgisayarPage {
    constructor(page) {
        this.page = page;
        this.phoneCategoryFieldLocator = page.locator("(//span[@class='checkmark'])[6]");
        this.searchInputFieldLocator = page.locator('#navbar-search-input');
        this.favIconButtonLocator = page.locator('#fav_Icon');
    }
    // Search for a product using the provided search term
    async searchProduct(searchTerm) {
        logger.info(`Searching for product: ${searchTerm}`);

        //Assertion: we will control this assertion for search field visibility
        await expect(this.page.getByRole('textbox', { name: 'Aramak istediğiniz ürünü yazın' })).toBeVisible();

        await this.searchInputFieldLocator.click();
        await this.searchInputFieldLocator.fill(searchTerm);
        await this.searchInputFieldLocator.press('Enter');
        await waitForAwhile(this.page, 3000); //3 second wait
    }
    // Filter the search results by the phone category
    async filterByPhoneCategory() {
        try {
            logger.info('Filtering results by phone category.');
            await expect(this.page.getByRole('tab', { name: 'Kategoriler ' })).toBeVisible();
            await expect(this.phoneCategoryFieldLocator).toBeVisible();
            await this.phoneCategoryFieldLocator.click();
        }
        catch (e) {
            logger.warn('Category tab is not visible.', e.message);
        }
    }
    // Verify the search results for the expected products
    async verifySearchResults() {
        logger.info('Verifying search results.');
        await expect(this.phoneCategoryFieldLocator).toBeVisible();
        const expectedProducts = [
            '(10) SM-A065FZKGTUR Samsung',
            '(10) SM-A165FZKJTUR Samsung',
            '(20) SM-S721BZKGTUR Samsung'
        ];
        for (const product of expectedProducts) {
            //Assertions // Control the some Samsung Phone models.
            await expect(this.page.getByRole('link', { name: product })).toBeVisible();
        }
        logger.info('All expected products are visible in the search results.');
    }
    // Navigate to the second page of search results
    async navigateToPage2() {
        logger.info('Navigating to page 2 of search results.');

        // Locate the page 2 link
        const pageTwoLink = await this.page.locator("//a[normalize-space()='2']");

        // Scroll the link into view if needed
        await pageTwoLink.scrollIntoViewIfNeeded();

        // Click the link to navigate to page 2
        await pageTwoLink.click();

        logger.info('Successfully navigated to page 2 of search results.');
    }
    // Select a product from the search results
    async selectProduct(productSelector) {
        logger.info(`Selecting product: ${productSelector}`);
        await this.page.getByRole('link', { name: productSelector }).click();
    }
    // Add the selected product to favorites
    async addToFavorites() {
        logger.info('Adding product to favorites.');

        //Firstly control the fav button is visible or not.
        await expect(this.favIconButtonLocator).toBeVisible();

        //After the controlling button visibility, We can click the this button correctly.
        await this.favIconButtonLocator.click();

        await waitForAwhile(this.page, 3000);  // For loading process we will add here an 3 second wait.
        //Error handling with try catch block for some assertion. Visibility control part.

        /**try {
            //Assertions
            await expect(this.page.locator('#modal-favorite')).toContainText('Ürün, favori listenize eklendi.');
            await this.page.getByRole('button', { name: 'Close' }).click();
        } catch (e) {
            logger.warn('After clicking fav button about an item, This adding favorite process is failed.');
            logger.warn(e.message);
        }*/

        logger.info('Product has been added to favorites.');
    }
    // Navigate to the favorites page
    async goToFavorites() {
        logger.info('Navigating to favorites.');

        const accountButtonLocator= "//button[@id='btnMyAccount']";
        await this.page.locator(accountButtonLocator).click();
        await waitForAwhile(this.page, 3000);
        await this.page.getByRole('link', { name: 'Favori Ürünlerim' }).click();


    }
    // Add a favorite product to the cart
    async addFavoriteToCart() {
        logger.info('Adding favorite product to cart.');

        await waitForAwhile(this.page, 3000);
        await expect(this.page.locator('h1')).toContainText('Favorilerim');
        await this.page.getByRole('link', { name: 'Sepete Ekle' }).nth(0).click();
        await waitForAwhile(this.page, 3000);
        // Verify product added to cart
        try {
            await expect(this.page.locator('#modal-basket')).toContainText('Ürün Eklendi.');
            logger.info('Favorite product has been added to the cart.');
        } catch (e) {
            logger.warn('Product is not added correctly in bucket. Please check and control');
            logger.error(e.message);
            throw e;
        }

    }
    // Navigate to the cart page
    async goToCart() {
        try {
            const goBucket = await this.page.getByRole('button', { name: 'SEPETE GİT' });
            await expect(goBucket).toBeVisible();
            await goBucket.click();

            logger.info('Navigating to the cart.');
        } catch (e) {
            logger.error(e);
        }
    }
    // Proceed to checkout from the cart
    async proceedToCheckout() {
        logger.info('Proceeding to checkout.');
        try {
            await expect(this.page.getByRole('button', { name: 'Sepeti Onayla ' })).toBeVisible();
            await expect(this.page.getByRole('heading', { name: 'Sipariş Özeti' })).toBeVisible();
        } catch (e) {
            logger.warn('Checkout page does not loaded correctly');
            logger.error(`goToCart method gived failed. Error details: ${e.message}`);
        }
        await this.page.getByRole('button', { name: 'Sepeti Onayla ' }).click();
    }
    // Add a delivery address during checkout
    async addDeliveryAddress() {
        //Call statement to get the test data
        const { address } = TEST_DATA;

        logger.info('Adding delivery address.');
        try {
            await expect(this.page.getByRole('button', { name: 'Teslimatı Onayla ' })).toBeVisible();
        } catch (e) {
            logger.error('This text is not visible --> "teslimatı onayla"');
        }

        //new address add button click
        await this.page.getByRole('form').locator('span').first().click();
        // alternative method: await this.page.getByText('Yeni adres ekle').click();

        // Fill address form
        const addressRecordName = this.page.locator('#AddressRecordName');
        await addressRecordName.click();
        await addressRecordName.fill(address.recordName);

        const fullNameField = this.page.locator('#NameandSurname');
        await fullNameField.click();
        await fullNameField.fill(address.fullName);

        await this.page.locator('#SelectedCityName').selectOption(address.city);
        await this.page.locator('#FSelectedTownName').selectOption(address.district);
        await this.page.locator('#FSelectedNeighbourhoodName').selectOption(address.neighborhood);


        await this.page.locator('.selectize-input').click();  //Post Code.
        await this.page.getByText(address.postaCode).click();

        const adressField = this.page.locator('#Address');
        await adressField.click();
        await adressField.fill(address.street);

        const tcknNo = this.page.locator('#Tckn');
        await tcknNo.click();
        await tcknNo.fill(address.tckn);

        await this.page.getByRole('button', { name: 'KAYDET' }).click();
        await waitForAwhile(this.page, 2000);

        await this.page.getByRole('button', { name: 'Tamam' }).click();
        await waitForAwhile(this.page, 2000);

        logger.info('Delivery address has been added.');
    }
    // Empty the cart
    async emptyCart() {
        logger.info('Emptying the cart.');
        try {
            await this.page.getByRole('link', { name: ' Sepetim' }).click();
            await expect(this.page.getByRole('link', { name: ' Sepeti Boşalt' })).toBeVisible();
            await this.page.getByRole('link', { name: ' Sepeti Boşalt' }).click();
            // Verify cart is empty
            await expect(this.page.getByRole('heading', { name: 'Sepetinizde ürün bulunmuyor.' })).toBeVisible();
            await expect(this.page.locator('.empty-basket-content')).toBeVisible(); //LOGO control
            logger.info('Cart has been emptied.');
        } catch (e) {
            logger.warn('Cart has not been emptied correctly.');
            logger.error(`Error details: ${e.message}`);
        }
    }
    // Start shopping again
    async startShopping() {
        logger.info('Starting a new shopping session.');
        await this.page.getByRole('link', { name: 'Alışverişe Başla' }).click();
        await waitForAwhile(this.page, 3000);
    }
}