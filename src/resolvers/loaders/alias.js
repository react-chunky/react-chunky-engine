'use strict'

let path = require('path')

module.exports = (context) => ({
  'chunky-sass-loader': path.resolve(path.join(context.engine.dir, 'loaders/sassLoader.js')),
})
