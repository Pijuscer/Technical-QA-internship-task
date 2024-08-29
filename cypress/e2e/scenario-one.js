describe("Luma page", () => {
    beforeEach(() => {
        // Visit the Luma page before each test
        cy.visit('https://magento.softwaretestingboard.com/');
    });

    it("Should open the Men's dropdown", () => {
        // Hover over the Men menu and verify that the submenu is visible
        cy.get('a[id="ui-id-5"]').trigger('mouseover');
        cy.get('a[id="ui-id-5"]').parent().find('ul.submenu').should('be.visible');
    });

    it("Should display Tops and Bottoms options under Men", () => {
        // Hover over the Men menu and verify that Tops and Bottoms options are present
        cy.get('a[id="ui-id-5"]').trigger('mouseover');
        cy.get('a[id="ui-id-17"]').should('contain', 'Tops');
        cy.get('a[id="ui-id-18"]').should('contain', 'Bottoms');
    });

    it("Should display correct options under Tops", () => {
        // Hover over the Men menu, then the Tops submenu, and verify the options
        cy.get('a[id="ui-id-5"]').trigger('mouseover');
        cy.get('a[id="ui-id-17"]').trigger('mouseover');
        cy.get('a[id="ui-id-19"]').should('contain', 'Jackets');
        cy.get('a[id="ui-id-20"]').should('contain', 'Hoodies & Sweatshirts');
        cy.get('a[id="ui-id-21"]').should('contain', 'Tees');
        cy.get('a[id="ui-id-22"]').should('contain', 'Tanks');
    });

    it("Should navigate to Hoodies & Sweatshirts section", () => {
        // Hover over the Men menu, then the Tops submenu, and click on Hoodies & Sweatshirts
        cy.get('a[id="ui-id-5"]').trigger('mouseover');
        cy.get('a[id="ui-id-17"]').trigger('mouseover');
        cy.get('a[id="ui-id-20"]').click();
        // Verify that the Hoodies & Sweatshirts page is displayed
        cy.get('main[id="maincontent"]').should('contain', 'Hoodies & Sweatshirts');
    });

    it("Should display the correct number of Hoodies & Sweatshirts per page", () => {
        // Navigate to Hoodies & Sweatshirts and verify the number of items displayed
        cy.get('a[id="ui-id-5"]').trigger('mouseover');
        cy.get('a[id="ui-id-17"]').trigger('mouseover');
        cy.get('a[id="ui-id-20"]').click();
        cy.get('#limiter').should('have.value', '12');
        cy.get('.products-grid .product-items .product-item').should('have.length', 12);
    });

    it("Should navigate to the Frankie Sweatshirt product page", () => {
        // Navigate to the Frankie Sweatshirt product page by clicking on the product name
        cy.get('a[id="ui-id-5"]').trigger('mouseover');
        cy.get('a[id="ui-id-17"]').trigger('mouseover');
        cy.get('a[id="ui-id-20"]').click();
        cy.contains('a', 'Frankie Sweatshirt').click();
        // Verify that the Frankie Sweatshirt details page is opened
        cy.get('h1.page-title span.base').should('contain.text', 'Frankie Sweatshirt');
    });

    it("Should select size M, color Yellow, and quantity 2, then add the product to cart", () => {
        // Directly visit the Frankie Sweatshirt product page
        cy.visit('https://magento.softwaretestingboard.com/frankie-sweatshirt.html');
        // Select size M
        cy.get('div.swatch-attribute.size').within(() => {
            cy.get('div[option-label="M"]').click();
        });
        // Select color Yellow
        cy.get('.swatch-attribute.color').within(() => {
            cy.get('div[option-label="Yellow"]').click();
        });
        // Set quantity to 2
        cy.get('input#qty').clear().type('2');
        // Add to cart
        cy.get('button#product-addtocart-button').click();
        // Verify the cart icon is updated with the correct quantity
        cy.get('.minicart-wrapper .counter-number').should('have.text', '2');
        // open cart
        cy.get('.minicart-wrapper .counter-number').click();
        cy.get('.block-minicart').should('be.visible');
        // verify cart content
        cy.get('.count').should('have.text', '2');
        cy.get('.amount.price-container .price-wrapper').should('have.text', '$120.00');
        cy.get('.product-image-wrapper').should('be.visible');
        cy.get('.block-minicart .product-item-name a').should('have.text', 'Frankie  Sweatshirt');
        cy.get('.product-item-pricing .price').should('have.text', '$60.00');
        cy.get('.details-qty.qty input[data-item-qty]').should('have.value', '2');
        cy.get('.product.options').eq(0).contains('See Details').click();
        cy.get('.product.options.list .values span').eq(0).should('have.text', 'M');
        cy.get('.product.options.list .values span').eq(1).should('have.text', 'Yellow');
        // Proceed to checkout
        cy.get('button[id="top-cart-btn-checkout"]').click();
        cy.get('.checkout-shipping-address input[id="customer-email"]').should('be.visible');
        // Fill shipping address
        cy.wait(2000);
        cy.get('input[id="customer-email"]').eq(0).type('pijus@test.lt');
        cy.get('input[name="firstname"]').type('Pijus');
        cy.get('input[name="lastname"]').type('Černiauskas');
        cy.get('input[name="street[0]"]').type('Vytauto pr. 1');
        cy.get('select[name="country_id"]').select('Lithuania');
        cy.get('select[name="region_id"]').select('Kauno Apskritis');
        cy.get('input[name="city"]').type('Kaunas');
        cy.get('input[name="postcode"]').type('12345');
        cy.get('input[name="telephone"]').type('+37061111111');
        cy.wait(3000);
        cy.get('[type="radio"]').first().check()
        cy.get('button[data-role="opc-continue"]').click();
        // Review & Payments
        cy.get('button.action.primary.checkout').click();
        // Verify that the order confirmation message is displayed
        cy.get('.checkout-success').should('be.visible').and('contain.text', 'Your order # is:')
        .and('contain.text', 'We\'ll email you an order confirmation with details and tracking info.');
        // Verify the "Continue Shopping" button is present and functional
        cy.get('a.action.primary.continue').should('be.visible').and('have.attr', 'href', 'https://magento.softwaretestingboard.com/').click();
    });
});