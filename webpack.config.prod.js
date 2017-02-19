const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "styles.css",
  disable: process.env.NODE_ENV === 'development'
});

const assetsPath = path.join(__dirname, 'dist');
const publicPath = '/dist/';
const nodeModules = {};

fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = [{
  entry: [
    './src/index',
  ],

  output: {
    path: assetsPath,
    publicPath,
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        loader: extractSass.extract({
          // use style-loader in development
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader', options: { includePaths: [path.resolve(__dirname, './styles')] } }
          ],
        })
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    extractSass,
  ]
}, {
  // Add module for server side rendering
  name: 'Production server',
  entry: './index',
  target: 'node',
  output: {
    path: assetsPath,
    publicPath,
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  node: {
    // Use node __dirname, not webpack's mock value
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: nodeModules,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop')
  ]
}];
