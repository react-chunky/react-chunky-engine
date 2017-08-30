'use strict'

let paths = require('./paths')
let alias = require('./alias')

module.exports = (context) => ({
  modules: paths(context),
  alias: alias(context),
  mainFiles: ["index"],
  extensions: [".js", ".yaml", ".json"],
  moduleExtensions: ["-loader"]
})
