import Richer from './slater/richer'

let App = {
  init() {
    console.log('spaghetti')
    // RickCARRRRRT
    let cartOptions = {
      cartContainer: 'CartContainer', // Accepts an ID
      addToCartFrom: 'AddToCartFrom', // Accepts an ID
      cartCounter: 'CartCounter', // Accepts an ID
    }
    let richCart = new Richer(cartOptions)
    richCart.init()
  }
}

App.init()
