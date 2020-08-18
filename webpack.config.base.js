const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const OUTPUT_ROOT = './dist';
const PROJECT_ROOT = './src';
const ROOT = './';

module.exports = {
  entry: ['./src/index.js'],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: [
          path.resolve(__dirname, PROJECT_ROOT),
        ],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.[s]?css$/,
        include: path.resolve(__dirname, PROJECT_ROOT),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpe?g)$/,
        loader: 'url-loader'
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-react-loader',
      },
    ]
  },
  resolve: { extensions: ['*', '.js', '.ts', '.tsx'] },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss'],
    modules: [
      path.resolve(__dirname, PROJECT_ROOT),
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, './test'),
    ],
  },
  output: {
    path: path.resolve(__dirname, OUTPUT_ROOT),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React app',
      filename: 'index.html',
      template: path.resolve(__dirname, PROJECT_ROOT, 'index.ejs'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
