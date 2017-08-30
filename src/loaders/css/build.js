'use strict'

let common = require('./common')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (context) => ({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: common(context)
  })
})
