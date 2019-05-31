require('dotenv').config();

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const webpack = require('webpack');

const buildTarget = process.env.BUILD_TARGET || 'web';
const isProduction = process.env.NODE_ENV === 'production';
const isWeb = buildTarget === 'web';
const version = require('./package.json').version;

const config = {
  entry: {
    main: ['normalize.css', './src/styles.sass', './src/main.tsx'],
  },
  output: {
    path: path.resolve('./dist'),
    publicPath: '/',
    filename: isWeb ? '[name].[hash:12].js' : '[name].js',
  },
  mode: isProduction ? 'production' : 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: isWeb ? '[name].[hash:12].[ext]' : '[name].[ext]',
        },
      },
      {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
    new CopyWebpackPlugin({ from: 'target/shared' }),
    new CopyWebpackPlugin({ from: `target/${buildTarget}` }),
    new HtmlWebpackPlugin({ template: './target/common/index.html' }),
    new MiniCssExtractPlugin({
      filename: isWeb ? '[name].[hash:12].css' : '[name].css',
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
  devtool: isWeb ? 'source-map' : false,
  stats: {
    warnings: false,
  },
};

if (isProduction) {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  );
}

if (isWeb) {
  config.plugins.push(
    new SWPrecacheWebpackPlugin({
      cacheId: 'tabliss-cache',
      dontCacheBustUrlsMatching: /\.\w{12}\./,
      filename: 'service-worker.js',
      minify: true,
      navigateFallback: '/index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/],
    }),
  );
}

module.exports = config;
