import picoapp from 'picoapp'

import header from './components/header.js'

const state = {
  cartOpen: false
}

const actions = {
  toggleCart: open => state => ({ cartOpen: open !== undefined ? open : !state.cartOpen })
}

const components = {
  header
}

export default picoapp(components, state, actions)
