var utils = require('./utils')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: true,
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
