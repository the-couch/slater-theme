import { removeItem } from 'slater/cart'

export default item => {
  const button = item.getElementsByTagName('button')[0]
  const id = item.getAttribute('data-id')

  console.log('hey?')

  button.addEventListener('click', e => {
    console.log('clicky')
    e.preventDefault()

    removeItem(id)
  })
}
