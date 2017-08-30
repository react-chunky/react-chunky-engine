'use strict'

let path = require('path')
let yaml = require('js-yaml')
let fs = require('fs-extra')

class Context {

  constructor(props) {
    this._props = props
    this.load()
  }

  stringify() {
    return JSON.stringify({
      props: this.props,
      engine: this.engine,
      product: this.product,
      stack: this.stack,
      layout: this.layout,
      env: this.env
    })
  }

  reload(newProps) {
    this._props = Object.assign(this.props, newProps)
    this.load()
  }

  load() {
    // This is the minimal main product context section
    this._product = {
      dir: path.resolve(this.props.dir)
    }

    if (!fs.existsSync(this.specFile)) {
      // Let's make sure there is a product spec available,
      // otherwise, silently skip loading
      return
    }

    // If we do have a spec, let's load it up
    this._spec = JSON.parse(fs.readFileSync(this.specFile, 'utf8'))
    this._secureSpec = JSON.parse(fs.readFileSync(this.secureSpecFile, 'utf8'))

    // Let's configure the context now
    this.configure()

    // Let's keep the flag updated
    this._configured = true

    // If we do have a layout spec, let's load it up
    this.layout.props = JSON.parse(fs.readFileSync(this.layoutSpecFile, 'utf8'))
  }

  configure () {
    // Let's look through and resolve the stack
    this._stack = {
      name: this.spec.stack.name,
      dir: path.resolve(this.props.dir, "node_modules", this.spec.stack.name)
    }

    // We need to keep track of the active layout
    this._layout = {
      name: this.spec.stack.layout,
      dir: path.resolve(this.stack.dir, "layouts", this.spec.stack.layout)
    }

    // This is the library the stack is based on
    this._libs = {
      main: path.resolve(this.props.dir, "node_modules", "react-chunky"),
      web: path.resolve(this.props.dir, "node_modules", "react-dom-chunky"),
      mobile: path.resolve(this.props.dir, "node_modules", "react-native-chunky"),
      cloud: path.resolve(this.props.dir, "node_modules", "react-cloud-chunky")
    }

    // We're going have to context be aware of the environment
    this._env = {
      dev: (this.props.environment && this.props.environment === 'development')
    }

    // Let's look through and resolve the engine
    // this._engine = {
    //   dir: this.props.engineDir || path.resolve(this.props.dir, "node_modules", "react-chunky-engine")
    // }

    // Let's give the engine some instructions
    this._engine = {
      dir: this.libs.web,
      host: "localhost",
      port: 9000,
      options: {}
    }

    // This is the main product context section
    this._product = {
      name: this.spec.name,
      info: this.spec.info,
      dir: path.resolve(this.props.dir),
      web: this.spec.web,
      mobile: this.spec.mobile,
      cloud: this.spec.cloud,
      secure: this.secureSpec,
      build: {
        dir: path.resolve(this.props.dir, ".chunky"),
        webDir: path.resolve(this.props.dir, ".chunky", "web"),
        mobileDir: path.resolve(this.props.dir, ".chunky", "mobile"),
        cloudDir: path.resolve(this.props.dir, ".chunky", "cloud")
      }
    }
  }

  pageMenu(pageName) {
    if (!this.product.web.menu) {
      return []
    }

    var index = 0
    return this.product.web.menu.map(item => ({
      id: index++,
      link: "#",
      title: item.page || "?"
    }))
  }

  get props() {
    return this._props
  }

  get specFile() {
    return path.resolve(this.props.dir, 'chunky.json')
  }

  get secureSpecFile() {
    return path.resolve(this.props.dir, '.chunky.json')
  }

  get layoutSpecFile() {
    return path.resolve(this.layout.dir, 'chunky.json')
  }

  get spec() {
    return this._spec
  }

  get layoutSpec() {
    return this._layoutSpec
  }

  get secureSpec() {
    return this._secureSpec
  }

  get isConfigured() {
    return this._configured
  }

  get layout () {
    return this._layout
  }

  get product () {
    return this._product
  }

  get stack() {
    return this._stack
  }

  get engine () {
    return this._engine
  }

  get libs () {
    return this._libs
  }

  get env () {
    return this._env
  }
}

module.exports = Context
