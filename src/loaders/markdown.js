'use strict'

module.exports = (context) => ({
  test: /.md?$/,
  loader: 'json!markdown-it-front-matter-loader'
})
