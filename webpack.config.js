let path = require('path');

const environment = process.env.env

module.exports = {
  devtool: environment === 'dev' ? false : 'source-map',
  mode: environment === 'dev' ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'nights-watch',
    libraryTarget: 'umd',
    // libraryExport: 'default',
    globalObject: 'this'
  },
  resolve: {
      extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.ts?$/, loader: 'tslint-loader', enforce: 'pre', exclude: /(node_modules)/, },
      { test: /\.ts?$/, loader: 'babel-loader', exclude: /(node_modules)/, }
    ]
  },
  plugins: []
}