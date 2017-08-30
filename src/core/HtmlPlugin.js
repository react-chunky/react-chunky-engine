'use strict'

let chalk = require('chalk')
let requireFromString = require('require-from-string')
let ejs = require('ejs')
let path = require('path')
let Ora = require('ora')
let log = require('log-update')

class HtmlPlugin {

  constructor(context) {
    this._context = context
    this._startTime = new Date().getTime()
    this._spinner = new Ora()
  }

  get context() {
    return this._context
  }

  initializeIfNecessary(compilation) {
    if (this._carmel) {
      return
    }

    // We're only loading carmel once
    const context = this.context
    const bundle = compilation.assets['carmel.js']
    const source = bundle.source()
    const Carmel = requireFromString(source).default
    this._carmel = new Carmel(this.context)
  }

  get spinner() {
    return chalk.gray.dim(this._spinner.frame())
  }

  get carmel () {
    return this._carmel
  }

  get startTime() {
    return this._startTime
  }

  log(message) {
    log(`${chalk.bold("[Carmel]")} ${message}`)
  }

  onStart() {
    this._startTime = new Date().getTime()
  }

  onDone(done) {
    const time = this.endTime(this.startTime);
    this.log(chalk.green("✔ Successfully built in ") + chalk.bold(time));
    done && done()
  }

  onModuleStart(module) {
  }

  onModuleFailure(module) {
    if (!module.resource) {
        // Ignore context logging
        return
    }

    this.log(chalk.red("✘ ") +  chalk.gray(module.resource))
    this.log(chalk.red(module.error))
  }

  onModuleSuccess(module) {
    if (!module.resource) {
      // Ignore context logging
      return
    }

    this.log(chalk.green("Building ") + chalk.gray(module.resource))
  }

  endTime(startTime) {
    const time = new Date().getTime() - startTime
    return (time < 1000 ? time + "ms" : (parseFloat(time/1000).toFixed(2) + "s"))
  }

  injectPageHtml(compilation, data, done) {
    if (this.context.env.dev) {
      data.html = ejs.render(data.html, {
        carmel: {
          page: data.plugin.options.page,
          dependencies: this.context.layout.props.dependencies || [],
          pageHtml: ""
        }
      })
      done(null, data)
      return
    }

    this.initializeIfNecessary(compilation)
    this.carmel.generatePage(data.plugin.options.page).
           then((html) => {
              data.html = ejs.render(data.html, {
                carmel: {
                  page: data.plugin.options.page,
                  dependencies: this.context.layout.props.dependencies || [],
                  pageHtml: html
                }
              })
              done(null, data)
           }).
           catch((error) => done(error))
  }

  apply(compiler) {
    compiler.plugin("compile", (params) => this.onStart())

    compiler.plugin("compilation", (compilation) => {
      compilation.plugin('html-webpack-plugin-before-html-processing',
                          (data, done) => this.injectPageHtml(compilation, data, done))
      compilation.plugin('build-module', (module) => this.onModuleStart(module))
      compilation.plugin('failed-module', (module) => this.onModuleFailure(module))
      compilation.plugin('succeed-module', (module) => this.onModuleSuccess(module))
    })

    compiler.plugin('emit', (compilation, done) => this.onDone(done))
  }
}

module.exports = HtmlPlugin
