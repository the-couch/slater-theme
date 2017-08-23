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
    .then( r => {
      if ((typeof callback) === 'function') {
        callback(r.json())
      } else {
        RicherAPI.onCartUpdate(r.json())
      }
    })
}

RicherAPI.getCart = (callback) => {
  fetch('/cart.js', { credentials: 'same-origin' })
    .then( r => r.json() )
    .then( cart => {
      if ((typeof callback) === 'function') {
        callback(cart)
      } else {
        RicherAPI.onCartUpdate(cart)
      }
    })
}

const byId = (selector) => {
  return document.getElementById(selector)
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
    dom.addToCartForm ? AddToCart() : null
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
    console.log('building', cart)
    const cartContainer = dom.cartContainer
    cartContainer.innerHTML = null

    if (cart.item_count === 0) {
      cartContainer.innerHTML = `<p>We're sorry your cart is empty</p>`
      return
    }

    console.log('taco', cart)

    var el = cartBlock(cart.items, update)

    function cartBlock (items, onclick) {
      return yo`
        <div>
          ${items.map((item) => {
            return yo`
              <div onclick=${onclick}>taco</div>
            `
          })}
        </div>
      `
    }

    function update () {
      console.log('update')
    }

    console.log('prior', cartContainer)

    cartContainer.appendChild(el)
  }

  return {
    init
  }
}

module.exports = Richer
