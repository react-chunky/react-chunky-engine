'use strict'

const LIBRARIES = {
                    React: 'react',
                    ReactDOM: 'react-dom',
                    ReactDOMServer: 'react-dom/server',
                    ReactRouter: 'react-router',
                    Media: 'react-media',
                    MarkdownIt: 'markdown-it'
                  }

module.exports = (context) => {
  if (context.props.carmelDir) {
    // We ignore externals in custom scenarios
    return []
  }

  var externals = {}
  var libraries = Object.assign({}, LIBRARIES)

  if (context.layout.props.dependencies) {
    // Add in all the dependencies, if any
    context.layout.props.dependencies.forEach(dependency => {
      libraries[dependency.name] = dependency.module
    })
  }

  Object.keys(libraries).forEach(library => {
    externals[libraries[library]] = {
      root: library,
      commonjs2: libraries[library],
      commonjs: libraries[library],
      amd: libraries[library]
    }
  })

  return externals
}
