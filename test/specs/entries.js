'use strict'

let savor = require("savor")
let entries = savor.src("entries")

savor.add("should config dev entries", (context, done) => {
  let dev = entries.dev({
    engine: {
      host: 'localhost',
      port: 9000,
      dir: "testdir"
    }
  })

  context.expect(dev).to.exist
  context.expect(dev.length).to.equal(4)
  context.expect(dev[0]).to.equal('react-hot-loader/patch')
  context.expect(dev[1]).to.equal('webpack-dev-server/client?http://localhost:9000')
  context.expect(dev[2]).to.equal('webpack/hot/only-dev-server')

  done()
}).

add("should config build entries", (context, done) => {
  let build = entries.build({
    engine: {
      dir: "testdir"
    }
  })

  context.expect(build).to.exist
  context.expect(build.length).to.equal(1)

  done()
}).

add("should config all entries in dev mode", (context, done) => {
  let all = entries.all({
    env: {
      dev: true
    },
    engine: {
      host: 'localhost',
      port: 9000,
      dir: "testdir"
    }
  })

  context.expect(all).to.exist
  context.expect(all.length).to.equal(4)
  context.expect(all[0]).to.equal('react-hot-loader/patch')
  context.expect(all[1]).to.equal('webpack-dev-server/client?http://localhost:9000')
  context.expect(all[2]).to.equal('webpack/hot/only-dev-server')

  done()
}).

add("should config all entries in build mode", (context, done) => {
  let all = entries.all({
    env: {
      dev: false
    },
    engine: {
      host: 'localhost',
      port: 9000,
      dir: "testdir"
    }
  })

  context.expect(all).to.exist
  context.expect(all.length).to.equal(1)

  done()
}).

run("webpack config entries")
