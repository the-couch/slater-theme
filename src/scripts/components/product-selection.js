import { addVariant } from '../slater/cart.js'
import { component } from 'picoapp'
import wait from 'w2t'
import radio from '../slater/radio.js'
import options from '../slater/options.js'

export default component(({ node }) => {
  const opts = options(node)

  opts.onUpdate(state => {
    console.log(state)
  })

  // form.onsubmit = e => {
  //   e.preventDefault()

  //   const { quantity, id } = e.target.elements

  //   console.log(quantity.value, id.value)
  // }
})
