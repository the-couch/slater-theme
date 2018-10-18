import picoapp from 'picoapp'

import header from './components/header.js'
import product from './components/product.js'

const state = {
  cartOpen: false
}

const actions = {
  toggleCart: open => state => ({ cartOpen: open !== undefined ? open : !state.cartOpen })
}

const components = {
  header,
  product
}

export default picoapp(components, state, actions)
