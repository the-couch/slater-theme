import operator from 'operator'
import app from './app.js'
import wait from 'w2t'
import { fetchCart } from './slater/cart'

import '../styles/main.css'

let root = document.getElementById('pageTransition')

const animateRoute = () => {
  return new Promise(res => {
    root.classList.add('cover')
    setTimeout(() => {
      root.classList.remove('cover')
      res()
    }, 600)
  })
}

const router = operator('#root', [
  state => {
    return wait(20, [
      animateRoute()
    ])
  }
])

router.on('before', state => {
  // const pageTransition = document.getElementById('pageTransition')
  // pageTransition.classList.add('cover')
  return Promise.all([
    app.unmount(),
    new Promise(r => {
      document.body.classList.add('moving')
      setTimeout(r, 800)
    })
  ])
})

router.on('after', ({ title, pathname }) => {
  document.title = title
  window.history.pushState({}, '', pathname)
})

document.addEventListener('DOMContentLoaded', e => {
  Promise.all([
    fetchCart()
    // checkout.hydrate()
  ]).then(([ cart ]) => {
    app.hydrate({ cart: cart })
    app.mount()
  })
})

console.groupCollapsed('Slater credits 🍝  taco')
console.log('Development by The Couch https://thecouch.nyc')
console.groupEnd()
