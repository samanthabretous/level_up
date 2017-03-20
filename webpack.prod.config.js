const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './client/view/Entry.jsx',
  ],
  output: {
    path: path.join(__dirname, '/client/view/public/bundle'),
    filename: 'bundle.js',
    publicPath: '/client/view/public/bundle',
  },
  module: {
    loaders: [
      {
        test: [/\.scss$/, /\.css$/],
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
        loader: 'url',
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
  ],
};
