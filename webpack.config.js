const path = require('path');
const webpack = require('webpack');

const buildDirectory = './js/';

module.exports = {
  entry: "./src/main.jsx",
  output: {
    path: path.resolve(buildDirectory),
    filename: "build.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      }
    ]
  }
};
