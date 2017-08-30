'use strict'

let path = require('path')

module.exports = (context) => ([path.resolve(context.engine.dir, 'chunky.js')])
