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

const router = operator('#root')

router.on('before', state => {
  return Promise.all([
    app.unmount(),
    new Promise(r => {
      document.body.classList.add('moving')
      setTimeout(r, 800)
    })
  ])
})

console.groupCollapsed('Slater credits 🍝  taco')
console.log('Development by The Couch https://thecouch.nyc')
console.groupEnd()
