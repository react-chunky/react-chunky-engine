'use strict'

let path = require('path')
let savor = require("savor")
let loaders = savor.src("loaders")

savor.add("should config babel loader", (context, done) => {
  let babel = loaders.babel({
    engine: {
      dir: "testdir"
    }
  })

  context.expect(babel).to.exist
  context.expect(babel.loader).to.equal('babel-loader')

  done()
}).

add("should config images loader", (context, done) => {
  let images = loaders.images({})

  context.expect(images).to.exist

  done()
}).

add("should config json loader", (context, done) => {
  let json = loaders.json({})

  context.expect(json).to.exist
  context.expect(json.loader).to.equal('json')

  done()
}).

add("should config html loader", (context, done) => {
  let html = loaders.html({})

  context.expect(html).to.exist
  context.expect(html.loader).to.equal('html')

  done()
}).

add("should config yaml loader", (context, done) => {
  let yaml = loaders.yaml({})

  context.expect(yaml).to.exist
  context.expect(yaml.loader).to.equal('json!yaml')

  done()
}).

add("should config all loaders in dev mode", (context, done) => {
  let all = loaders.all({
    env: {
      dev: true
    },
    engine: {
      dir: "testdir",
      options: {}
    },
    layout: {
      dir: "testdir"
    }
  })

  context.expect(all).to.exist
  context.expect(all.length).to.equal(7)
  context.expect(all[0].loader).to.equal('babel-loader')
  context.expect(all[3].loader).to.equal('json')
  context.expect(all[4].loader).to.equal('json!yaml')
  context.expect(all[5].loader).to.equal('html')
  context.expect(all[2].loaders.length).to.equal(2)

  done()
}).

add("should config all loaders in build mode", (context, done) => {
  let all = loaders.all({
    env: {
      dev: false
    },
    engine: {
      dir: "testdir",
      options: {}
    },
    layout: {
      dir: "testdir"
    }
  })

  context.expect(all).to.exist
  context.expect(all.length).to.equal(7)
  context.expect(all[0].loader).to.equal('babel-loader')
  context.expect(all[3].loader).to.equal('json')
  context.expect(all[4].loader).to.equal('json!yaml')
  context.expect(all[5].loader).to.equal('html')
  context.expect(all[2].loaders.length).to.equal(2)

  done()
}).

run("webpack config loaders")
