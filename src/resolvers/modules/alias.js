'use strict'

let path = require('path')

module.exports = (context) => ({
  'chunky/product/locale': path.join(context.product.dir, "locales", context.product.info.locales[0]),
  'chunky/product/props': path.join(context.product.dir, 'chunky.js'),
  'chunky/product': context.product.dir,
  'chunky/stack': path.resolve(context.stack.dir),
  'chunky/layout': path.resolve(context.layout.dir),
  'chunky': path.resolve(context.engine.dir)
})
