// Handles all the things ajax cart related,
// based around the timber ajax cart, minus the jquery
import serialize from 'form-serialize'
import request from 'superagent'

const RicherAPI = {}

RicherAPI.onCartUpdate = (cart) => {
  console.log('on update', cart.item_count)
}

RicherAPI.addItemFromForm = (form, callback, errorCallback) => {
  form = serialize(form, {hash: true})
  console.log('serialized', form)
  request
    .post('/cart/add.js')
    .send(form)
    .end((err, res) => {
      if (err) errorCallback(err)
      callback(res)
    })
}

RicherAPI.getCart = (callback) => {
  console.log('getcart', callback)
  request
    .get('/cart.js')
    .end((err, res) => {
      let cart = JSON.parse(res.text)
      if ((typeof callback) === 'function') {
        callback(cart)
      } else {
        RicherAPI.onCartUpdate(cart)
      }
    })
}

let Richer = {
  dom: {
    addToCart: document.querySelectorAll('.js-add-to-cart'),
    addToCartForm: document.getElementById('AddToCartForm'),
    cartContainer: document.getElementById('CartContainer')
  },
  config: {
    items: []
  },
  init(options) {
    this.dom.addToCartForm ? this.AddToCart() : null
  },
  AddToCart() {
    const form = this.dom.addToCartForm

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      form.classList.remove('is-added')
      form.classList.add('is-adding')

      RicherAPI.addItemFromForm(e.target, itemAddedCallback, itemErrorCallback)
    })

    const itemAddedCallback = (product) => {
      console.log('yo', product)

      RicherAPI.getCart(cartUpdateCallback)
    }

    const itemErrorCallback = (XMLHttpRequest, textStatus) => {
      console.log('error family')
    }

    const cartUpdateCallback = (cart) => {
      console.log('cart', cart)
    }
  }
}

export default Richer
