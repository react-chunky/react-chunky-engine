'use strict'

let dev = require('./dev')
let build = require('./build')
let all = (context) => (context.env.dev ? dev(context) : build(context))

module.exports = {
  dev, build, all
}
