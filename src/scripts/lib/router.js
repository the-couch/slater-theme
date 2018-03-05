import operator from 'operator.js'
import * as scripts from 'micromanager'

const router = operator({
  transitionSpeed: 400,
  routes: {}
})

router.addRoute('*', () => {
  const cache = scripts.cache.dump()
  let modules = []

  for (let key in cache) {
    modules.push(cache[key])
  }

  return Promise.all(modules.map(mod => {
    return mod.leave ? mod.leave() : mod
  }))
})

/**
 * Remount scripts on new routes
 */
router.on('afterRender', requestedRoute => {
  scripts.unmount()

  const cartDrawer = scripts.cache.get('cart-drawer')
  cartDrawer && cartDrawer.close()
  // const nav = scripts.cache.get('mobileNav')
  // nav && nav.close()

  const pageTransition = document.getElementById('pageTransition')
  setTimeout(() => {
    pageTransition.classList.remove('cover')
  }, 600)

  setTimeout(() => {
    scripts.mount()
  }, 0)
})

router.on('beforeRender', requestedRoute => {
  const root = document.getElementById('root')
  const pageTransition = document.getElementById('pageTransition')

  root.classList.add('moving')
  pageTransition.classList.add('cover')
  setTimeout(() => {
    console.log('waiting game')
  }, 700)
})

export default router
