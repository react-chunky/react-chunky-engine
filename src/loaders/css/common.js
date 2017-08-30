'use strict'

let path = require('path')

module.exports = (context) => ([{
  loader: 'css-loader',
  query: {
    modules: true,
    importLoaders: 1,
    localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
  }
},
{
  loader: 'sass-loader',
  query: {
    includePaths: [path.resolve(context.layout.dir)]
  }
},
{
  loader: 'chunky-sass-loader',
  query: {
    layout: context.layout,
    product: context.product
  }
}
])
