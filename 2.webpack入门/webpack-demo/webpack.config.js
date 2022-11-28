const path = require('path');
const webpack = require('webpack');
const FooterPlugin = require('./plugin/footerPlugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    // devtool: 'source-map',
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.ms$/,
                use: path.resolve(__dirname,'./loader/ms-loader.js')
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: '这是一段欢迎词'
        }),
        new FooterPlugin({
            banner: '这是页尾'
        })
    ]
}