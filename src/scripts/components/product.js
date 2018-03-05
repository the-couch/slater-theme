import { addVariant } from 'slater/cart'

export default el => {
  const { selectedOrFirstAvailableVariant, product } = JSON.parse(el.querySelector('.js-product-json').innerHTML)

  let currentVariant = product.variants.filter(v => v.id === selectedOrFirstAvailableVariant)[0]

  /**
   * Adding products to cart
   */
  const form = el.getElementsByTagName('form')[0]
  const submit = form.querySelector('.js-submit-cart')
  const quantity = form.querySelector('.js-quantity').value

  form.addEventListener('submit', e => {
    e.preventDefault()

    submit.disabled = true
    addVariant(currentVariant, quantity).then(({ item, cart }) => {
      submit.disabled = false
    }).catch(e => {
      submit.disabled = false
      /* eslint-disable */
      alert(e)
      /* eslint-enable */
    })
  })
}
