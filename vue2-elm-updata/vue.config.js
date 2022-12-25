const { defineConfig } = require('@vue/cli-service')

const path = require("path");
const glob = require("glob");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

// const webpack = require('webpack');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// const CopyWebpackPlugin = require("copy-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, 'src')
}

const smp = new SpeedMeasurePlugin({
  disable: !(process.env.MEASURE === 'true'),
  outputFormat: 'humanVerbose'
})

const isProduction = process.env.NODE_ENV === 'production';

module.exports = defineConfig({
  publicPath: './',
  parallel: true,
  configureWebpack: smp.wrap(config => {
    let pluginsArr = []
    if(isProduction) {
      pluginsArr = [
        // new webpack.DllReferencePlugin({
        //   context: __dirname,
        //   manifest: require.resolve('./public/dll/vendor-manifest.json')
        // }),
        // new CopyWebpackPlugin({
        //   patterns: [
        //     { from: path.resolve(__dirname, './public/dll/vendor.dll.js'), to: path.resolve(__dirname, './dist/dll/vendor.dll.js')},
        //   ],
        // }),
      ]
    }
    return {
      cache: { // 打包缓存，第二次打包生效
        type: 'filesystem',
        // cacheDirectory: path.resolve(__dirname, '.temp_cache'),
        cacheDirectory: path.resolve(__dirname, './node_modules/.temp_cache'),  //必须是绝对路径
        name: 'vue2-elm',// 修改缓存文件名称，默认"default-production"
        //cacheLocation: path.resolve(__dirname, './node_modules/.temp_cache','vue-elm'), //cacheDirectory+name的合体api
      },
      resolve: {
        alias: {
          'src': path.resolve(__dirname, './src'),
          'assets': path.resolve(__dirname, './src/assets'),
          'components': path.resolve(__dirname, './src/components')
        }
      },
      module: {
        rules: [{
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: { // 压缩 JPEG 图像
                  progressive: true,
                },
                optipng: { // 压缩 PNG 图像
                  enabled: false,
                },
                pngquant: { // 压缩 PNG 图像
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: { // 压缩 GIF 图像
                  interlaced: false,
                },
                webp: { // 将 JPG 和 PNG 图像压缩为 WEBP
                  quality: 75
                }
              }
            },
          ],
        }],
      },
      plugins: [
        new BundleAnalyzerPlugin(),
        new PurgeCSSPlugin({
          paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        }),
        ...pluginsArr
      ],
    }
  }),
  chainWebpack: config => {
    // if(isProduction) {
    //   config.plugin('vendorDll')
    //     .use(webpack.DllReferencePlugin, [{
    //       context: __dirname,
    //       manifest: require.resolve('./public/dll/vendor-manifest.json')
    //     }])
    //   config.plugin('addAssetHtml')
    //     .use(AddAssetHtmlPlugin, [
    //       [
    //         {
    //           filepath: require.resolve('./public/dll/vendor.dll.js'),// dll文件位置
    //           outputPath: 'dll',// dll最终输出的目录
    //           publicPath: 'dll'// dll 引用路径
    //         }
    //       ]
    //     ])
    //     .after('html')
    // }
  },
});

