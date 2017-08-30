'use strict'

let path = require('path')

module.exports = (context) => ({
  'carmel/product/locale': path.join(context.product.dir, "locales", context.product.info.locales[0]),
  'carmel/product/props': path.join(context.product.dir, 'chunky.js'),
  'carmel/product': context.product.dir,
  'carmel/stack': path.resolve(context.stack.dir),
  'carmel/layout': path.resolve(context.layout.dir),
  'carmel': path.resolve(context.engine.dir)
})
