import router from 'lib/router'
import * as scripts from 'micromanager'

const init = types => (ctx = document) => {
  for (let type in types) {
    const attr = 'data-' + type
    const nodes = [].slice.call(ctx.querySelectorAll(`[${attr}]`))

    for (let i = 0; i < nodes.length; i++) {
      try {
        require(types[type] + nodes[i].getAttribute(attr) + '.js').default(nodes[i])
      } catch (e) {
        console.error(e)
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', e => {
  init({
    component: './components/',
    page: './pages/'
  })()
})

/**
 * Script management
 */
scripts.init({
  component: 'components/',
  util: 'util/'
})

scripts.mount()

router.on('afterRender', () => {
  console.log('route rendered!')
})

console.groupCollapsed('Slater credits 🍝')
console.log('Development by The Couch https://thecouch.nyc')
console.groupEnd()
