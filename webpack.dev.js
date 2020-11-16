const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = merge(common, {
    mode: "development",

    entry: {
      main: './src/qrgame.ts'
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].bundle.js',
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['main'],
            template: './src/base.html',
            inject: true,
            inlineSource: '.(js|css)$',
        }),
        new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
    ],
});
