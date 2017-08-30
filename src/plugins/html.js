'use strict'

let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let fs = require('fs-extra')
let frontMatter = require('markdown-it-front-matter')
let markdown = (fm) => require('markdown-it')().use(frontMatter, fm)

module.exports = (context) => {
  var results = []
  var pages = context.product.web.pages

  const localesDir = path.resolve(context.product.dir, "locales")
  const locales = fs.readdirSync(localesDir)
  const defaultLocale = context.product.info.locales[0]

  var defaultMeta = {
    url: context.product.info.url,
    title: context.product.info.title,
    description: context.product.info.description,
    image: context.product.info.image,
  }

  locales.forEach(locale => {
    const articlesDir = path.resolve(context.product.dir, "locales", locale, 'articles')
    const articles = fs.readdirSync(articlesDir)

    articles.forEach(article => {
      const extlen = path.extname(article).length
      const id = path.basename(article).slice(0, -extlen)
      const root = context.product.info.blogRoot || "blog"
      const file = path.resolve(articlesDir, article)
      const content = fs.readFileSync(file, 'utf8')
      var settings = {}
      const data = markdown(fm => {
        fm.split("\n").map(line => {
          const [key, val] = line.split(":")
          settings[key.toLowerCase().trim()] = val.trim()
        })
      }).render(`${content}`)

      const meta = Object.assign({}, defaultMeta, {
        url: `${context.product.info.url}/${root}/${settings.path}`,
        title: settings.title,
        description: settings.summary,
        image: `${context.product.info.url}/${settings.image}`
      })

      pages.push({
        id, meta,
        name: `${root}/${settings.path}`,
        path: `${root}/${settings.path}`,
        data,
        settings,
        isArticle: true
      })
    })
  })

  pages.forEach((page) => {
    // Resolve the page path
    var pagePath = 'index.html'

    if (page.path) {
      pagePath = `${page.path}/index.html`
    }

    // Inject meta if necessary
    page.meta = page.meta || Object.assign({}, defaultMeta, {
      url: `${context.product.info.url}/${page.path || ''}`
    })

    // Enable page generation
    results.push(new HtmlWebpackPlugin({
      page: page,
      inject: true,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        conservativeCollapse: true,
        removeComments: true
      },
      filename: `${pagePath}`,
      template: path.resolve(path.join(context.layout.dir, '/webpage.html'))
    }))
  })

  return results
}
