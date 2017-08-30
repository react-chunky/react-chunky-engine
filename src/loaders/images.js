'use strict'

module.exports = (context) => ({
  test: /.*\.(gif|png|jpg|svg)$/i,
  loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}']
})
