require("dotenv/config");

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const workbox = require("workbox-webpack-plugin");
const webpack = require("webpack");
const ExtensionReloader = require("webpack-ext-reloader");

const buildTarget = process.env.BUILD_TARGET || "web";
const isProduction = process.env.NODE_ENV === "production";
const isWeb = buildTarget === "web";
const version = require("./package.json").version;

const config = {
  entry: {
    main: ["normalize.css", "./src/styles.sass", "./src/main.tsx"],
  },
  output: {
    path: path.resolve("dist", buildTarget),
    publicPath: "/",
    filename: isWeb ? "[name].[contenthash:12].js" : "[name].js",
  },
  mode: isProduction ? "production" : "development",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: isWeb ? "[name].[contenthash:12].[ext]" : "[name].[ext]",
        },
      },
      {
        // Thanks, `react-intl`
        test: /\.mjs$/,
        type: "javascript/auto",
      },
      {
        test: /\.sass$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        loader: "raw-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve("./src"),
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: "target/shared" },
        {
          from: `target/${buildTarget}`,
          filter: (path) => !path.includes("index.html"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: `./target/${buildTarget}/index.html`,
    }),
    new MiniCssExtractPlugin({
      filename: isWeb ? "[name].[contenthash:12].css" : "[name].css",
    }),
    new webpack.EnvironmentPlugin({
      BUILD_TARGET: "web",
      API_ENDPOINT: "https://api.tabliss.io/v1",
      SENTRY_PUBLIC_DSN: null,
      GIPHY_API_KEY: null,
      UNSPLASH_API_KEY: null,
      VERSION: version,
    }),
  ],
  devtool: isWeb || !isProduction ? "source-map" : false,
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

if (!isWeb) {
  config.entry.background = "./src/background.ts";
}

if (!isWeb && !isProduction) {
  config.plugins.push(
    new ExtensionReloader({
      reloadPage: true,
      entries: {
        background: "background",
        extensionPage: "main",
      },
    }),
  );
}

if (isWeb && isProduction) {
  config.plugins.push(
    new workbox.GenerateSW({
      cacheId: "tabliss-cache",
      dontCacheBustURLsMatching: /\.\w{12}\./,
    }),
  );
}

module.exports = config;
