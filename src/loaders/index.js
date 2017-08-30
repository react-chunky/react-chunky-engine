'use strict'

let babel = require('./babel')
let images = require('./images')
let json = require('./json')
let yaml = require('./yaml')
let css = require('./css')
let html = require('./html')
let markdown = require('./markdown')

let all = (context) => ([babel(context),
                         css.all(context),
                         images(context),
                         json(context),
                         yaml(context),
                         html(context),
                         markdown(context)])

module.exports = {
  babel, images, json, yaml, html, markdown, all
}
