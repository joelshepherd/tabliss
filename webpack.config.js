const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: {
    main: './src/main.tsx',
  },
  output: {
    path: path.resolve('./dist'),
    publicPath: '/',
    filename: '[name].[chunkhash:12].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        include: path.resolve('./src'),
        loader: 'tslint-loader',
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:12].[ext]',
        },
      },
      {
        test: /\.(sass|css)$/,
        use: ExtractTextPlugin.extract([
          'css-loader',
          'sass-loader',
        ]),
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve('./src'),
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('dist'),
    new CopyWebpackPlugin([
      { from: 'public' },
    ]),
    new ExtractTextPlugin('[name].[chunkhash:12].css'),
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      template: './public/index.html',
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'tabliss-cache',
      dontCacheBustUrlsMatching: /\.\w{12}\./,
      filename: 'service-worker.js',
      minify: true,
      navigateFallback: '/index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/],
    }),
    new webpack.EnvironmentPlugin({
      BUILD_TARGET: 'web',
      NODE_ENV: 'development',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    overlay: true,
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};

// Production build
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new MinifyPlugin());
  config.plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }));
}

// Extension build target
if (process.env.BUILD_TARGET === 'extension') {
  config.devtool = false;
  config.plugins = config.plugins.filter(plugin => ! (plugin instanceof SWPrecacheWebpackPlugin));
}

module.exports = config;
