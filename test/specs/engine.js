'use strict'

let path = require('path')
let savor = require('savor')
let Engine = savor.src('core/Engine')
let Context = savor.src('core/Context')

savor.add("should config", (context, done) => {
  savor.addAsset('assets/testproduct', 'testproduct', context)

  const dir = path.resolve('testproduct')
  const engineDir = path.resolve(path.join(__dirname, '../..'))

  // Start off by building a context
  const engineContext = new Context({
    dir,
    engineDir
  })

  // Create the engine
  let engine = new Engine(engineContext)

  context.expect(engine).to.exist

  done()
}).

run("main engine")
