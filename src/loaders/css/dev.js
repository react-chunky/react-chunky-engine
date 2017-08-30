'use strict'

let common = require('./common')

module.exports = (context) => ({
  test: /\.scss$/,
  loaders: ['style-loader'].concat(common(context))
})
