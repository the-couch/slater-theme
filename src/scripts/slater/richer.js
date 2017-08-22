// Handles all the things ajax cart related,
// based around the timber ajax cart, minus the jquery


let Richer = {
  dom: {
    addToCart: document.querySelectorAll('.js-add-to-cart'),
    cartContainer: document.getElementById('CartContainer')
  },
  config: {
    items: []
  },
  init(options) {
    console.log('cart', this)
  }
}

export default Richer
