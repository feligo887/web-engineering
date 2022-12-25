const Webpack = require('webpack');
const path = require('path');
const process = require('process');

const dllPath = '../public/dll';

//  分包操作
module.exports = {
  mode: 'production',
  entry: {
    vendor: ['vue','vue-router','vuex'],
  },
  output: {
    path: path.join(__dirname,dllPath),
    filename: '[name].dll.js',
    library: '[name]_[hash:8]'
  },
  plugins: [
    new Webpack.DllPlugin({
      path: path.join(__dirname,dllPath,'[name]-manifest.json'),
      name: '[name]_[hash:8]',
      context: process.cwd()
    }),
  ]
}
