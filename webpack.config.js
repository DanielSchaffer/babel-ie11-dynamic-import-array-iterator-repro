const merge = require('webpack-merge')

const triggered = process.env.npm_lifecycle_event && process.env.npm_lifecycle_event.endsWith('-triggered')

module.exports = merge(require('./webpack.common'), {
  entry: {
    'main': `./src/entry${triggered ? '-with-trigger' : ''}.js`,
  },
})
