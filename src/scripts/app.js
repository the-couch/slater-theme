import picoapp from 'picoapp'

import header from './components/header.js'
import product from './components/product.js'
import cartDrawer from './components/cartDrawer.js'

const state = {
  cartOpen: false
}

const actions = {
  toggleCart: open => state => ({ cartOpen: !state.cartOpen })
}

const components = {
  header,
  product,
  cartDrawer
}

export default picoapp(components, state, actions)
