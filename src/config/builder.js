'use strict'

let path = require('path')
let fs = require('fs-extra')
let entries = require('../entries')
let plugins = require('../plugins')
let loaders = require('../loaders')
let resolvers = require('../resolvers')
let externals = require('../externals')

module.exports = (context) => ({
  cache: true,
  context: path.resolve(context.product.dir),
  entry: entries.all(context),
  resolve: resolvers.modules(context),
  resolveLoader: resolvers.loaders(context),
  module: {
    loaders: loaders.all(context)
  },
  devtool: 'eval',
  externals: externals.all(context),
  target: 'web',
  output: {
      path: path.resolve(context.product.dir, 'chunky', 'web'),
      filename: 'chunky.js',
      libraryTarget: 'umd',
      publicPath: '/'
  },
  plugins: plugins.all(context)
})
