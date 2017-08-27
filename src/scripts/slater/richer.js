// Handles all the things ajax cart related,
// based around the timber ajax cart, minus the jquery
import serialize from 'form-serialize'
import fetch from 'unfetch'
import yo from 'yo-yo'

const RicherAPI = {}

RicherAPI.onCartUpdate = (cart) => {
  console.log('items in the cart?', cart.item_count)
}

RicherAPI.addItemFromForm = (form, callback, errorCallback) => {
  form = serialize(form, {hash: true})
  fetch('/cart/add.js', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then(r => {
      if ((typeof callback) === 'function') {
        callback(r.json())
      } else {
        RicherAPI.onCartUpdate(r.json())
      }
    })
}

RicherAPI.getCart = (callback) => {
  fetch('/cart.js', { credentials: 'same-origin' })
    .then(r => r.json())
    .then(cart => {
      if ((typeof callback) === 'function') {
        callback(cart)
      } else {
        RicherAPI.onCartUpdate(cart)
      }
    })
}

RicherAPI.changeItem = (line, quantity, callback) => {
  console.log('fire a change item ajaaaaaxy baby', line, quantity)
  let data = { line: line, quantity: quantity }
  fetch('/cart/change.js', {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(r => r.json())
    .then(cart => {
      console.log('swagger', cart)
      callback(cart)
    })
}

const byId = (selector) => {
  return document.getElementById(selector)
}

const cleanProduct = (item, index, config) => {
  let img = '//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif'
  img = item.image ? item.image.replace(/(\.[^.]*)$/, '_small$1').replace('http:', '') : img

  // Define our cart object (easier to visualize)
  return {
    key: item.key,
    image: img,
    url: item.url,
    name: item.product_title,
    index: index,
    variation: item.variant_title,
    properties: item.properties,
    itemAdd: item.quantity + 1,
    itemMinus: item.quantity - 1,
    itemQty: item.quantity,
    price: slate.Currency.formatMoney(item.price), // eslint-disable-line
    vendor: item.vendor,
    linePrice: slate.Currency.formatMoney(item.line_price), // eslint-disable-line
    originalLinePrice: slate.Currency.formatMoney(item.original_line_price), // eslint-disable-line
    discounts: item.discounts,
    discountsApplied: item.line_price === item.original_line_price ? false : true // eslint-disable-line
  }
}

const Richer = (options = {}) => {
  const defaults = {
    addToCart: '.js-add-to-cart', // classname
    addToCartForm: 'AddToCartForm', // id
    cartContainer: 'CartContainer', // id
    cartCounter: 'CartCounter', // id
    items: []
  }

  const config = Object.assign({}, defaults, options)

  const dom = {
    addToCartForm: byId(config.addToCartForm),
    cartContainer: byId(config.cartContainer),
    cartCounter: byId(config.cartCounter)
  }

  const init = (options) => {
    if (dom.addToCartForm) {
      AddToCart()
    }
    RicherAPI.getCart(cartUpdateCallback)
  }

  const AddToCart = () => {
    const form = dom.addToCartForm

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      form.classList.remove('is-added')
      form.classList.add('is-adding')

      RicherAPI.addItemFromForm(e.target, itemAddedCallback, itemErrorCallback)
    })

    const itemAddedCallback = () => {
      RicherAPI.getCart(cartUpdateCallback)
    }

    const itemErrorCallback = (XMLHttpRequest, textStatus) => {
      console.log('error family')
    }
  }

  const cartUpdateCallback = (cart) => {
    updateCount(cart)
    buildCart(cart)
    RicherAPI.onCartUpdate(cart)
  }

  const updateCount = (cart) => {
    const counter = dom.cartCounter
    counter.innerHTML = cart.item_count
  }

  const buildCart = (cart) => {
    const cartContainer = dom.cartContainer
    cartContainer.innerHTML = null

    if (cart.item_count === 0) {
      cartContainer.innerHTML = `<p>We're sorry your cart is empty</p>`
      return
    }

    var el = cartBlock(cart.items, cart, update)

    function cartBlock (items, cart, qtyControl) {
      return yo`
        <div class='r-cart'>
          ${items.map((item, index) => {
            const product = cleanProduct(item, index, config)
            return yo`
              <div class="r-cart__product f jcb">
                <div>
                  <img src='${product.image}' alt='${product.name}' />
                </div>
                <div class="r-cart__product_info">
                  <h5><a href='${product.url}'>${product.name}</a></h5>
                  ${product.variation ? yo`<span>${product.variation}</span>` : null}
                  ${realPrice(product.discountsApplied, product.originalLinePrice, product.linePrice)}
                  ${yo`
                    <div class="r-cart__qty f jcb">
                      <div class="r-cart__qty_control" onclick=${() => qtyControl(product, product.itemMinus)}>
                        <svg width="20" height="20" viewBox="0 0 20 20"><path fill="#444" d="M17.543 11.029H2.1A1.032 1.032 0 0 1 1.071 10c0-.566.463-1.029 1.029-1.029h15.443c.566 0 1.029.463 1.029 1.029 0 .566-.463 1.029-1.029 1.029z"/></svg>
                      </div>
                      <span>${product.itemQty}</span>
                      <div class="r-cart__qty_control" onclick=${() => qtyControl(product, product.itemAdd)}>
                        <svg width="20" height="20" viewBox="0 0 20 20" class="icon"><path fill="#444" d="M17.409 8.929h-6.695V2.258c0-.566-.506-1.029-1.071-1.029s-1.071.463-1.071 1.029v6.671H1.967C1.401 8.929.938 9.435.938 10s.463 1.071 1.029 1.071h6.605V17.7c0 .566.506 1.029 1.071 1.029s1.071-.463 1.071-1.029v-6.629h6.695c.566 0 1.029-.506 1.029-1.071s-.463-1.071-1.029-1.071z"/></svg>
                      </div>
                    </div>
                  `}
                </div>
              </div>
            `
          })}
          ${subTotal(cart.total_price, cart.total_cart_discount)}
        </div>
      `
    }

    function subTotal (total, discount) {
      // TODO: handling discounts
      const totalPrice = slate.Currency.formatMoney(total)  // eslint-disable-line
      return yo`
        <div>
          <h5>Subtotal: ${totalPrice}</h5>
        </div>
      `
    }

    function realPrice (discountsApplied, originalLinePrice, linePrice) {
      if (discountsApplied) {
        return yo`
          <div>
            <small className='strike'>${originalLinePrice}</small>
            <br /><span>${linePrice}</span>
          </div>
        `
      } else {
        return yo`
          <span>${linePrice}</span>
        `
      }
    }

    function update (item, quantity) {
      RicherAPI.changeItem((item.index + 1), quantity, bagel)

      let newCart = cartBlock(cart.items, cart, update)
      yo.update(el, newCart)
    }

    function bagel (cart) {
      console.log('sup?', cart)
    }

    cartContainer.appendChild(el)
  }

  return {
    init
  }
}

module.exports = Richer
