'use strict'

module.exports = (context) => ({
  test: /.yaml?$/,
  loader: 'json!yaml'
})
