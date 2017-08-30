'use strict'

module.exports = (context) => ({
  contentBase: context.product.build.webDir,
  publicPath: '/',
  hot: true,
  inline: true,
  historyApiFallback: true,
  quiet: true,
  stats: {
    colors: true
  }
})
