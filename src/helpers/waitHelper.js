
//time parameter will be second. for 3 second, you can write 3000.
export async function waitForAwhile(page,time) {
    await page.waitForTimeout(time);
}

//Example of usage: await waitForSelector(page, '#myElement');
export async function waitForSelector(page, selector, timeout = 30000) {
    await page.waitForSelector(selector, { timeout });
}

export async function waitForNavigation(page, options = {}) {
    // Waits for the page to navigate to a new URL based on the provided options.
    await page.waitForNavigation(options);
}

export async function waitForFunction(page, func, ...args) {
    //Waits until the specified function returns a truthy value, passing any additional arguments to it.
    await page.waitForFunction(func, ...args);
}

//Example of usage: await waitForResponse(page, 'https://api.example.com/data');
export async function waitForResponse(page, urlOrPredicate, timeout = 30000) {
    // Waits for a specific network response that matches the provided URL or predicate within the given timeout (default is 30 seconds).
    await page.waitForResponse(urlOrPredicate, { timeout });
}

/*
Example of usage:
await waitForAwhile(page, 3000); // Wait for 3 seconds
await waitForSelector(page, '#myElement'); // Wait for an element with the selector '#myElement'
await waitForNavigation(page); // Wait for the page to navigate
await waitForFunction(page, () => document.title === 'Expected Title'); // Wait until the document title is 'Expected Title'
await waitForResponse(page, 'https://api.example.com/data'); // Wait for a specific API response
*/