## E-commerce Website Test Scenarios

### Test Scenario 1: User Authentication and Product Search
Objective: Verify that users can successfully log in and search for Samsung products
#### Test Case 1.1: Verify Homepage Access
Test Steps:
1. Navigate to the e-commerce website
2. Wait for the homepage to load completely

 - Expected Result: Homepage should load successfully and display main navigation elements

#### Test Case 1.2: User Login
Test Steps:
1. Click on the login/sign-in button
2. Enter valid username and password
3. Click login button
- Expected Result: User should be successfully logged in and redirected to homepage or dashboard

#### Test Case 1.3: Product Search
Test Steps:
1. Locate the search field in the header
2. Enter "samsung" in the search field
3. Click the "Search" button
- Expected Result: Search results page should display with Samsung products

#### Test Scenario 2: Product Category Navigation and Filtering
- Objective: Verify navigation through product categories and pagination
#### Test Case 2.1: Navigate to Phone Category
Test Steps:
1. From the search results page, locate the left sidebar menu
2. Click on "Phone" category
3. Click on "Mobile Phone" subcategory
- Expected Result: Page should filter to show only mobile phones from Samsung

#### Test Case 2.2: Verify Search Results
Test Steps:
1. Review the filtered results page
2. Confirm Samsung products are displayed
- Expected Result: Search results should contain Samsung mobile phones

#### Test Case 2.3: Navigate to Second Page
Test Steps:
1. Locate pagination controls at the bottom of the results
2. Click on page "2"
3. Wait for page to load
- Expected Result: Second page should load and display "Page 2" indicator

#### Test Scenario 3: Product Selection and Wishlist Management
- Objective: Verify product selection and adding items to wishlist
#### Test Case 3.1: Select Product from Results
Test Steps:
1. On the second page of results, locate the 5th product from the top
2. Click on the product to open product details
- Expected Result: Product detail page should open with full product information

#### Test Case 3.2: Add Product to Wishlist
Test Steps:
1. On the product detail page, locate the "Like" or "Add to Wishlist" button
2. Click the "Like" button
3. Wait for confirmation message
- Expected Result: A popup should appear with message "Product added to your list"
#### Test Case 3.3: Access Wishlist
Test Steps:
1. Navigate to the top of the page
2. Click on account menu
3. Select "My Favorites" or "Wishlist" option
- Expected Result: Wishlist page should open showing saved products

#### Test Case 3.4: Verify Product in Wishlist
Test Steps:
1. Review the wishlist page
2. Confirm the previously liked product is present
- Expected Result: The Samsung product added in previous step should be visible in the wishlist

#### Test Scenario 4: Shopping Cart Management
Objective: Verify adding products to cart and cart management functionality
#### Test Case 4.1: Add Product to Cart from Wishlist

Test Steps:
1. From the wishlist page, locate the saved Samsung product
2. Click "Add to Cart" button for that product
3. Wait for confirmation message
- Expected Result: A popup should appear with message "Product added to cart"

#### Test Case 4.2: Navigate to Shopping Cart
Test Steps:
1. Click on the shopping cart icon or "My Cart" link
2. Wait for cart page to load
- Expected Result: Shopping cart page should open displaying added products

#### Test Case 4.3: Remove Product from Cart
Test Steps:
1. Locate the Samsung product in the cart
2. Click on the product to view details or options
3. Click the "Remove" button
4. Confirm removal if prompted

- Expected Result: Product should be removed from the cart

#### Test Case 4.4: Verify Product Removal
Test Steps:
1. Refresh the cart page or check cart contents
2. Verify the Samsung product is no longer present
- Expected Result: The removed product should not appear in the cart, confirming successful removal

