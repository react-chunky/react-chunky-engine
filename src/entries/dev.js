'use strict'

let path = require('path')

module.exports = (context) => ([
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://' + context.engine.host + ':' + context.engine.port,
  'webpack/hot/only-dev-server',
  path.resolve(context.engine.dir, 'carmel.js')
])
