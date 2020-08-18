const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const defaultConfig = require('./webpack.config.base');

module.exports = merge(defaultConfig, {
  mode: 'development',
  devServer: {
    public: 'localhost:5003',
    hot: true,
    port: 5003,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [],
});
