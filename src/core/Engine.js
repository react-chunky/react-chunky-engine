'use strict'

let path = require('path')
let fs = require('fs-extra')
let webpack = require('webpack')
let config = require('../config')
let WebpackDevServer  = require('webpack-dev-server')
let bindi = require('bindi')

class Engine {

  constructor(context) {
    this._context = context
    this._config = config(context)
  }

  get context() {
    return this._context
  }

  get config() {
    return this._config
  }

  clean() {
    if (!fs.existsSync(this.context.product.build.dir)) {
      // No need to remove the build location because it does not exist
      return
    }

    // Let's clean up the entire build
    fs.removeSync(this.context.product.build.dir)
  }

  start() {
    return new Promise((resolve, reject) => {
      // Let's start off by cleaning the previous build
      this.clean()

      new WebpackDevServer(webpack(this.config.builder), this.config.server).
        listen(this.context.engine.port, this.context.engine.host, (error) => {
          if (error) {
            // Looks like webpack failed with a hard error
            reject(error)
            return
          }

          // Start a development API
          const apiUrl = 'http://localhost:' + this.context.product.cloud.api.settings.port
          utils.logger.info("API started at " + apiUrl)
          bindi.start(this.context.specFile, "api")

          // Open a browser with the website loaded
          const url = 'http://' + this.context.engine.host + ':' + this.context.engine.port
          utils.logger.info("Web started at " + url)
          utils.core.openUrl(url);

          resolve()
        })
    })
  }

  build() {
    return new Promise((resolve, reject) => {
      // Let's start off by cleaning the previous build
      this.clean()

      const builder = webpack(this.config.builder, (error, stats) => {
        if (error) {
          // Looks like webpack failed with a hard error
          reject(error)
          return
        }

        if (stats.compilation.errors && stats.compilation.errors.length > 0) {
          // Webpack attempted to build but it failed
          reject(stats.compilation.errors[0])
          return
        }

        resolve(builder)
      })
    })
  }
}

module.exports = Engine
