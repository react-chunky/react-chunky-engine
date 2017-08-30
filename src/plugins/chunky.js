'use strict'

let path = require('path')
let HtmlPlugin = require('../core/HtmlPlugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')

const assets = (context) => (context.isConfigured ? [{
  from: path.resolve(context.layout.dir, "assets", "web"),
  to: path.resolve(context.product.dir, "chunky", "web")
},
{
  from: path.resolve(context.product.dir, "assets", "web"),
  to: path.resolve(context.product.dir, "chunky", "web")
}] : [])

module.exports = (context) => ([
  new HtmlPlugin(context),
  new CopyWebpackPlugin(assets(context))
])
