const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { EnvironmentPlugin, HotModuleReplacementPlugin } = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ["./src/index.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Home Base",
      template: "./public/index.html",
      filename: "./index.html",
      favicon: "./public/favicon.ico",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new HotModuleReplacementPlugin(),
    // new EnvironmentPlugin({
    //   newEnvVar: 'FirstEnvVar!',
    // }),
    // new Dotenv({
    //   path: '../.env',
    // }),
  ],
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
