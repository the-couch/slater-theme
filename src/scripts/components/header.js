import { on, fetchCart } from 'slater/cart'

export default props => {
  // Handle cart count hard hit
  const cartCount = props.querySelector('.js-cart-count')
  const cart = fetchCart()
  cart.then(res => {
     /* eslint-disable */
    res ? cartCount.innerHTML = res.item_count : null
    /* eslint-enable */
  })
  on('updated', ({ cart }) => {
    cartCount.innerHTML = cart.item_count
  })
}
