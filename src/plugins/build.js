'use strict'

let path = require('path')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let webpack = require('webpack')

module.exports = (context) => ([
  new ExtractTextPlugin({
      filename: 'chunky.css',
      allChunks: true
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    },
    'chunky' : {
      'context': context.stringify()
    }
  })
])
