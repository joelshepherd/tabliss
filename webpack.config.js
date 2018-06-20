require('dotenv').config();

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const webpack = require('webpack');

const version = require('./package.json').version;

const config = {
  entry: {
    main: [
      'normalize.css',
      './src/styles.sass',
      './src/main.tsx',
    ],
  },
  output: {
    path: path.resolve('./dist'),
    publicPath: '/',
    filename: process.env.BUILD_TARGET === 'web' ? '[name].[hash:12].js' : '[name].js',
  },
  mode: 'development',
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
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: process.env.BUILD_TARGET === 'web' ? '[name].[hash:12].[ext]' : '[name].[ext]',
        },
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
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
    new MiniCssExtractPlugin({
      filename: process.env.BUILD_TARGET === 'web' ? '[name].[hash:12].js' : '[name].css',
    }),
    new HtmlWebpackPlugin({
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
      API_ENDPOINT: 'https://api.tabliss.io/v1',
      SENTRY_PUBLIC_DSN: null,
      DRIBBBLE_API_KEY: null,
      GIPHY_API_KEY: null,
      UNSPLASH_API_KEY: null,
      VERSION: version,
    }),
  ],
  devServer: {
    historyApiFallback: true,
    overlay: true,
  },
  devtool: 'source-map',
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  stats: {
    warnings: false,
  }
};

// Production build
if (process.env.NODE_ENV === 'production') {
  config.mode = 'production';
  config.plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }));
}

// Extension build targets
if (process.env.BUILD_TARGET === 'chrome' || process.env.BUILD_TARGET === 'firefox') {
  config.devtool = false;
  config.plugins = config.plugins.filter(plugin => ! (plugin instanceof SWPrecacheWebpackPlugin));
  config.plugins.push(new CopyWebpackPlugin([{
    from: `src/manifest_${process.env.BUILD_TARGET}.json`,
    to: 'manifest.json',
  }]));
}

module.exports = config;
