'use strict'

let savor = require("savor")
let resolvers = savor.src("resolvers")

savor.add("should config modules resolvers", (context, done) => {
  savor.addAsset('assets/testproduct', 'testproduct', context)

  let modules = resolvers.modules({
      engine: {
        dir: "testdir"
      },
      stack: {
        dir: "testdir"
      },
      layout: {
        dir: "testdir"
      },
      product: {
        info: {
          locales: ["en"]
        },
        dir: "testproduct",
      }
  })
  done()
}).

add("should config loaders resolvers", (context, done) => {
  let loaders = resolvers.loaders({
      engine: {
        dir: "testdir"
      },
      stack: {
        dir: "testdir"
      },
      layout: {
        dir: "testdir"
      },
      product: {
        info: {
          language: "en"
        },
        dir: "testdir"
      }
  })
  done()
}).

run("webpack config resolvers")
