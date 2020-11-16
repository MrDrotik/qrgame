// const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {

    entry: {
      main: './src/qrgame.ts'
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].bundle.js',
    },

    optimization: {
        runtimeChunk: 'single',
    // optimization: {
        // minimize: false,
    //     // minimizer: [
    //     //     new TerserPlugin({
    //     //         parallel: true,
    //     //         sourceMap: false,
    //     //         terserOptions: {
    //     //             ecma: 6,
    //     //             compress: {
    //     //               arrows: true,
    //     //               ecma: 6,
    //     //               collapse_vars: false,
    //     //             },
    //     //         }
    //     //     }),
    //     // ],
    },
    resolve: {
        extensions: [".ts", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
    ],

    externals: {
    }
};
