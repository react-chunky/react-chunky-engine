'use strict'

let path = require('path')

const excludeFilter = (context) => {
  var filter = [/node_modules\/(?!(react-chunky-engine)\/).*/]
  return filter
}

const includeFilter = (context) => {
  var filter = [path.resolve(context.engine.dir)]
  context.stack && filter.push(path.resolve(context.stack.dir))
  return filter
}

module.exports = (context) => ({
    test: /.js?$/,
    loader: 'babel-loader',
    include: includeFilter(context),
    query: {
      cacheDirectory: true,
      presets: [
        [require.resolve('babel-preset-es2015'), {
          modules: false
        }],
        require.resolve('babel-preset-react')
      ],
      plugins: [require.resolve('react-hot-loader/babel'),
      [require.resolve('babel-plugin-react-css-modules'), {
        context: path.resolve(context.product ? context.product.dir : context.engine.dir),
        filetypes: {
          ".scss": "postcss-scss"
        }
      }]]
    }
})
