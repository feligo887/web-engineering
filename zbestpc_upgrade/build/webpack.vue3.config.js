const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const config = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../dist'),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'images/[name].[hash:6][ext]',
        },
      },
      {
        test: /\.ejs/,
        loader: 'ejs-loader',
        options: {
          esModule: false,
        },
      },
    ],
  },
  optimization: {
    minimize: true, //代码压缩
    usedExports: true, // treeshaking
    splitChunks: {
      minSize: 20000, // 1kb   表示在压缩前的最小模块大小,默认值是30kb
      chunks: 'all', //同时分割同步和异步代码,推荐。
      name: 'common',
      automaticNameDelimiter: '_', //名称分隔符，默认是~
      cacheGroups: {
        //默认的规则不会打包,需要单独定义
        jquery: {
          // 将jquery抽出来
          name: 'jquery',
          chunks: 'all',
          test: /jquery\.js/,
          enforce: true,
        },
        SuperSlide: {
          // SuperSlide
          name: 'SuperSlide',
          chunks: 'all',
          test: /jquery.SuperSlide.2.1.1/,
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css',
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/img'),
          to: path.resolve(__dirname, '../dist/img'),
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = config;
