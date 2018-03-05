import * as scripts from 'micromanager'
import { on, fetchCart } from 'slater/cart'

export default header => {
  // Handle cart count hard hit
  const cartCount = header.querySelector('.js-cart-count')
  const cart = fetchCart()
  cart.then(res => {
     /* eslint-disable */
    res ? cartCount.innerHTML = res.item_count : null
    /* eslint-enable */
  })
  on('updated', ({ cart }) => {
    cartCount.innerHTML = cart.item_count
  })
  on('addon', ({ cart }) => {
    cartCount.innerHTML = cart.item_count
  })
  /**
 // * Cart opening
 // */
  const cartToggles = header.querySelectorAll('.js-cart-drawer-toggle')
  for (let toggle of cartToggles) {
    toggle.addEventListener('click', e => {
      e.preventDefault()
      const cartDrawer = scripts.cache.get('cart-drawer')
      cartDrawer.open()
    })
  }
}
