describe("Luma page", () => {
    beforeEach(() => {
        // Visit the Luma page before each test
        cy.visit('https://magento.softwaretestingboard.com/');
    });
    it("Should open the Women's dropdown", () => {
        // Hover over the Women menu and verify that the submenu is visible
        cy.get('a[id="ui-id-4"]').trigger('mouseover');
        cy.get('a[id="ui-id-4"]').parent().find('ul.submenu').should('be.visible');
    });

    it("Should display Tops and Bottoms options under Women", () => {
        // Hover over the Woemen menu and verify that Tops and Bottoms options are present
        cy.get('a[id="ui-id-4"]').trigger('mouseover');
        cy.get('a[id="ui-id-9"]').should('contain', 'Tops');
        cy.get('a[id="ui-id-10"]').should('contain', 'Bottoms');
    });
    it("Should display correct options under Bottoms", () => {
        // Hover over the Women menu, then the Bottoms submenu, and verify the options
        cy.get('a[id="ui-id-4"]').trigger('mouseover');
        cy.get('a[id="ui-id-10"]').trigger('mouseover');
        cy.get('a[id="ui-id-15"]').should('contain', 'Pants');
        cy.get('a[id="ui-id-16"]').should('contain', 'Shorts');
    });
    it("Should navigate to Pants section", () => {
        // Hover over the Women menu, then the Bottoms submenu, and click on Pants
        cy.get('a[id="ui-id-4"]').trigger('mouseover');
        cy.get('a[id="ui-id-10"]').trigger('mouseover');
        cy.get('a[id="ui-id-15"]').click();
        // Verify that the Pants page is displayed
        cy.get('main[id="maincontent"]').should('contain', 'Pants');
    });

    it("Should navigate to filter section to show the cheapest products available", () => {
        // Navigate to Pants and verify that filter section to show the cheapest products available
        cy.get('a[id="ui-id-4"]').trigger('mouseover');
        cy.get('a[id="ui-id-10"]').trigger('mouseover');
        cy.get('a[id="ui-id-15"]').click();
        // Verify that the Pants page is displayed
        cy.get('main[id="maincontent"]').should('contain', 'Pants');
        // Verify that filter select Price
        cy.wait(3000);
        cy.get('#sorter').select('Price');
        cy.get('#sorter').should('have.value', 'price')
    });
    it("Should be consistent take place in the process of buying women's goods", () => {
        // Navigate to Pants and verify that filter section to show the cheapest products available
        cy.get('a[id="ui-id-4"]').trigger('mouseover');
        cy.get('a[id="ui-id-10"]').trigger('mouseover');
        cy.get('a[id="ui-id-15"]').click();
        // Verify that the Pants page is displayed
        cy.get('main[id="maincontent"]').should('contain', 'Pants');
        // Verify that filter select Price
        cy.wait(3000);
        cy.get('#sorter').select('Price');
        cy.get('#sorter').should('have.value', 'price')
        // Select cheapest pant
        cy.contains('a', 'Karmen Yoga Pant').click();
        // Verify that the Karmen Yoga Pant details page is opened
        cy.get('h1.page-title span.base').should('contain.text', 'Karmen Yoga Pant');
        // Select size 29
        cy.get('div.swatch-attribute.size').within(() => {
            cy.get('div[option-label="29"]').click();
        });
        // Select color Gray
        cy.get('.swatch-attribute.color').within(() => {
            cy.get('div[option-label="Gray"]').click();
        });
        // Set quantity to 1
        cy.get('input#qty').clear().type('1');
        // Add to cart
        cy.get('button#product-addtocart-button').click();
        // Verify the cart icon is updated with the correct quantity
        cy.get('.minicart-wrapper .counter-number').should('have.text', '1');
        // Directly visit Women Pants page
        cy.visit('https://magento.softwaretestingboard.com/women/bottoms-women/pants-women.html');
        // Verify that filter select Price
        cy.wait(3000);
        cy.get('#sorter').select('Price');
        cy.get('#sorter').should('have.value', 'price')
        // Select Sylvia Capri pant
        cy.contains('a', 'Sylvia Capri').click();
        // Verify that the Sylvia Capri Pant details page is opened
        cy.get('h1.page-title span.base').should('contain.text', 'Sylvia Capri');
        // Select size 28
        cy.get('div.swatch-attribute.size').within(() => {
            cy.get('div[option-label="28"]').click();
        });
        // Select color Green
        cy.get('.swatch-attribute.color').within(() => {
            cy.get('div[option-label="Green"]').click();
        });
        // Set quantity to 1
        cy.get('input#qty').clear().type('1');
        // Add to cart
        cy.get('button#product-addtocart-button').click();
        // Verify the cart icon is updated with the correct quantity
        cy.get('.minicart-wrapper .counter-number').should('have.text', '2');
        // Directly visit Women Pants page
        cy.visit('https://magento.softwaretestingboard.com/women/bottoms-women/pants-women.html');
        // Verify that filter select Price
        cy.wait(3000);
        cy.get('#sorter').select('Price');
        cy.get('#sorter').should('have.value', 'price')
        // Select Emma Leggings pant
        cy.contains('a', 'Emma Leggings').click();
        // Verify that the Emma Leggings Pant details page is opened
        cy.get('h1.page-title span.base').should('contain.text', 'Emma Leggings');
        // Select size 29
        cy.get('div.swatch-attribute.size').within(() => {
            cy.get('div[option-label="29"]').click();
        });
        // Select color Red
        cy.get('.swatch-attribute.color').within(() => {
            cy.get('div[option-label="Red"]').click();
        });
        // Set quantity to 1
        cy.get('input#qty').clear().type('1');
        // Add to cart
        cy.get('button#product-addtocart-button').click();
        // Verify the cart icon is updated with the correct quantity
        cy.get('.minicart-wrapper .counter-number').should('have.text', '3');
        // open cart
        cy.get('.minicart-wrapper .counter-number').click();
        cy.get('.block-minicart').should('be.visible');
        cy.contains('a.action.viewcart', 'View and Edit Cart').click();
        // Remove product from the cart.
        cy.get('a.action-delete[title="Remove item"]').eq(2).click();
        // Add product to the cart from suggested products
        cy.get('ol.products.list.items.product-items li.item.product.product-item', { timeout: 10000 }).eq(0).find('button.action.tocart.primary').should('be.visible').click();
        // Proceed to checkout
        cy.get('button[data-role="proceed-to-checkout"]').click();
        cy.wait(2000);
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