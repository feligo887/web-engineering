const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const dir = process.cwd();

module.exports = {
  chainWebpack: (config) => {
    config.plugin('ProvidePlugin')
      .use(webpack.ProvidePlugin, [{
        $: 'jquery',
        jQuery: 'jquery',
      }]);

    config.plugin('CopyPlugin')
      .use(CopyPlugin, [{
        patterns: [
          {
            from: path.resolve(dir, './src/img'),
            to: path.resolve(dir, './dist/img'),
          },
        ],
      }]);
  },
};
