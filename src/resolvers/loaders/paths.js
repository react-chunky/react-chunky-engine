'use strict'

let path = require('path')

module.exports = (context) => ([
  path.resolve(context.product.dir),
  path.resolve(context.stack.dir),
  path.resolve(context.engine.dir),
  path.resolve(path.join(context.product.dir, 'node_modules')),
  path.resolve(path.join(context.stack.dir, 'components')),
  path.resolve(path.join(context.stack.dir, 'node_modules')),
  path.resolve(path.join(context.engine.dir, 'node_modules'))
])
