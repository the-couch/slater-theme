window.slate = window.slate || {};
window.theme = window.theme || {};

/*================ Slate ================*/
// =require slate/a11y.js
// =require slate/cart.js
// =require slate/utils.js
// =require slate/rte.js
// =require slate/sections.js
// =require slate/currency.js
// =require slate/images.js
// =require slate/variants.js

/*================ Sections ================*/
// =require sections/product.js

/*================ Templates ================*/
// =require templates/customers-addresses.js
// =require templates/customers-login.js

const Site = {
  init() {
    var sections = new slate.Sections();
    sections.register('product', theme.Product);

    console.log('hey sup?')

    // Common a11y fixes
    slate.a11y.pageLinkFocus(window.location.hash);

    document.querySelector('.in-page-link').addEventListener('click', function(evt) {
      slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
    });

    // Wrap videos in div to force responsive layout.
    slate.rte.wrapTable();
    slate.rte.iframeReset();
    //
    // // Apply a specific class to the html element for browser support of cookies.
    if (slate.cart.cookiesEnabled()) {
      document.documentElement.className = document.documentElement.className.replace('supports-no-cookies', 'supports-cookies');
    }
  }
}

Site.init()
