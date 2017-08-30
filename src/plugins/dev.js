'use strict'

let path = require('path')
let webpack = require('webpack')

module.exports = (context) => ([
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development')
    },
    'chunky' : {
      'context': context.stringify()
    }
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.WatchIgnorePlugin([path.resolve(path.join(context.engine.dir, 'node_modules'))])
])
