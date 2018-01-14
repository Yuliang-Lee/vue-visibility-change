const path = require('path');

function resolve(dir) {
  return path.resolve(__dirname, '..', dir);
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve("lib"),
    filename: 'vue-visibility.js',
    library: 'visibility',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          resolve("src")
        ],
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['js'],
  }
  
};
