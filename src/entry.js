import { createDom } from './es6-dom'
import { es6 } from './logos'
import ready from './ready'

function check(bind = false) {
  if (['complete', 'interactive'].indexOf(document.readyState) >= 0) {
    document.onreadystatechange = undefined
    return init()
  }
  if (bind) {
    document.onreadystatechange = check.bind(null, false)
  }
}

async function init() {
  const dom = createDom('ie11-dynamic-import-array-iterator', es6)

  const greener = await import('./make.it.green')
  greener.makeItGreen()

  dom.setStatus('good to go!')
  ready()
}

check(true)
