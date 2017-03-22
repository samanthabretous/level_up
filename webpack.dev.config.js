const path = require('path');
const webpack = require('webpack');
require('react-hot-loader/patch');


module.exports = {
  entry: [
    'react-hot-loader/patch', // RHL patch
    './client/view/Entry.jsx', // appʼs entry point
  ],
  output: {
    path: path.join(__dirname, '/client/view/public/bundle'),
    filename: 'bundle.js',
    publicPath: '/client/view/public/bundle',
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
  },
  module: {
    loaders: [
      {
        test: [/\.scss$/, /\.css$/],
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$|\.eot$|^(?!.*\.inline\.svg$).*\.svg$/,
        loader: 'url-loader',
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$|\.eot$|^(?!.*\.inline\.svg$).*\.svg$/,
        loaders: ['url-loader', 'file-loader'],
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  watch: true,
  plugins: [
    // webpack hot module reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
