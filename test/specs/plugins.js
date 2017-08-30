'use strict'

let savor = require("savor")
let plugins = savor.src("plugins")

savor.add("should config plugins", (context, done) => {
  let chunky = plugins.chunky({})
  done()
}).

add("should config build plugins", (context, done) => {
  let build = plugins.build({
    stringify: () => {}
  })

  done()
}).

add("should config dev plugins", (context, done) => {
  let dev = plugins.dev({
    engine: {
      dir: "testdir"
    },
    stringify: () => {}
  })

  done()
}).

add("should config all plugins in dev mode", (context, done) => {
  savor.addAsset('assets/testproduct', 'testproduct', context)

  let all = plugins.all({
    env: {
      dev: true
    },
    engine: {
      dir: "testdir"
    },
    layout: {
      dir: 'testdir'
    },
    stringify: () => {},
    product: {
      dir: "testproduct",
      info: {
        locales: ["en"]
      },
      web: {
        pages: [{
          path: '/'
        }, {
          path: 'about'
        }]
      }
    }
  })

  done()
}).

add("should config all plugins in build mode", (context, done) => {
  savor.addAsset('assets/testproduct', 'testproduct', context)

  let all = plugins.all({
    env: {
      dev: false
    },
    engine: {
      dir: "testdir"
    },
    layout: {
      dir: 'testdir'
    },
    stringify: () => {},
    product: {
      dir: "testproduct",
      info: {
        locales: ["en"]
      },
      web: {
        pages: [{
          path: '/'
        }, {
          path: 'about'
        }]
      }
    }
  })

  done()
}).

add("should config html plugins", (context, done) => {
  savor.addAsset('assets/testproduct', 'testproduct', context)

  let html = plugins.html({
    layout: {
      dir: 'testdir'
    },
    engine: {
      dir: "testdir"
    },
    stringify: () => {},
    product: {
      dir: "testproduct",
      info: {
        locales: ["en"]
      },
      web: {
        pages: [{
          path: '/'
        }, {
          path: 'about'
        }]
      }
    }
  })
  done()
}).

run("webpack config plugins")
