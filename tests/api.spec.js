import { test, expect } from '@playwright/test';

const apiUrl = 'https://api.practicesoftwaretesting.com';

test('GET /products', async ({ request }) => {
    const response = await request.get(apiUrl + '/products');

    expect (response.status()).toBe(200);

    // It should return 9 products
    const body = await response.json();
    expect(body.data.length).toBe(9);
});

/**
 * Two consecutive API calls
 */
test('GET /products/{id}', async ({ request }) => {
    // First a product is searched and its ID extracted
    const getProductResponse = await request.get(apiUrl + '/products/search?q=thor%20hammer');
    expect(getProductResponse.status()).toBe(200);

    const productBody = await getProductResponse.json();
    const productID = productBody.data[0].id;

    // Then the products is fetched by ID
    const response = await request.get(apiUrl + '/products/' + productID);
    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.in_stock).toBe(true);
    expect(body.is_location_offer).toBe(false);
    expect(body.is_rental).toBe(false);
    expect(body.name).toBe('Thor Hammer');
    expect(body.price).toBe(11.14);
});

test('POST /users/login', async ({ request }) => {
    const response = await request.post(apiUrl + '/users/login', {
        data: {
            email: 'customer@practicesoftwaretesting.com',
            password: 'welcome01'
        }
    });

    expect (response.status()).toBe(200);

    // It should return an access token
    const body = await response.json();
    expect(body.access_token).toBeTruthy();
});