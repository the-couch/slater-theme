// import router from './lib/router'

// const init = types => (ctx = document) => {
//   for (let type in types) {
//     const attr = 'data-' + type
//     const nodes = [].slice.call(ctx.querySelectorAll(`[${attr}]`))
//
//     for (let i = 0; i < nodes.length; i++) {
//       try {
//         require(types[type] + nodes[i].getAttribute(attr) + '.js').default(nodes[i])
//       } catch (e) {
//         console.error(e)
//       }
//     }
//   }
// }

// document.addEventListener('DOMContentLoaded', e => {
//   init({
//     component: './components/',
//     page: './pages/'
//   })()
// })
//
// /**
//  * Script management
//  */
// scripts.init({
//   component: 'components/',
//   util: 'util/'
// })
//
// scripts.mount()

//
// app.mount()
//
// router.on('afterRender', () => {
//   console.log('route rendered!')
//   app.unmount()
//   setTimeout(() => {
//     app.mount()
//   }, 0)
// })
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
    return wait(600, [
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
  console.log('after?')
  document.title = title
  window.history.pushState({}, '', pathname)
})

document.addEventListener('DOMContentLoaded', e => {
  Promise.all([
    fetchCart()
    // checkout.hydrate()
  ]).then(([ cart ]) => {
    console.log('yo response?', cart)
    app.hydrate({ cart: cart })
    app.mount()
  })
})

console.groupCollapsed('Slater credits 🍝  taco')
console.log('Development by The Couch https://thecouch.nyc')
console.groupEnd()
