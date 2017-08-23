import Richer from './slater/richer'

let App = {
  init() {
    console.log('spaghetti')
    // RickCARRRRRT
    let cartOptions = {
      cartContainer: 'CartContainer', // Accepts an ID
      addToCartFrom: 'addToCartFrom' // Accepts an ID
    }
    let richCart = new Richer(cartOptions)
    richCart.init()
  }
}

App.init()
