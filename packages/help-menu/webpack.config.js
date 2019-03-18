const path = require('path');

// - Convert 
module.exports = {
  entry: {
    app: ['./src/help-menu.module.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'help-menu.js'
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['@babel/env']
      }
    }]
  }
}