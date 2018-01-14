var path = require('path')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  devtool: '#inline-source-map',
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    library: 'visibility',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          fix: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,

      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"testing"' }
    })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}