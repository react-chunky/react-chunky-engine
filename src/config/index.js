'use strict'

let builder = require('./builder')
let server = require('./server')

module.exports = (context) => ({
  builder: builder(context),
  server: server(context)
})
