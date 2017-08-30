'use strict'

let dev = require('./dev')
let build = require('./build')
let chunky = require('./chunky')
let html = require('./html')

let all = (context) => chunky(context).concat(html(context), context.env.dev ? dev(context) : build(context))

module.exports = {
  dev, build, chunky, html, all
}
