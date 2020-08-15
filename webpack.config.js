const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = "development"; //important for babel to know we're in dev mode
process.env.BABEL_ENV = "development";

module.exports = {
    mode: 'development',
    target: 'node', //could use node instead
    devtool: 'cheap-module-source-map',
    entry: path.resolve(__dirname,'./src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    devServer: {
        inline:true,
        contentBase: './public',
        compress:true,
        stats: 'minimal',
        overlay: true,
        historyApiFallback: true,
        disableHostCheck: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        https: false
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.API_URL": JSON.stringify("http://localhost:3001")  //now webpack will replace process.env.API_URL wiht what we specified here.
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            filename: "index.html",
            inject: "body"
            //favicon: "src/favicon.ico"
        })
    ],
    module: {
        rules: [
            {
                test:/\.html/,
                loader: 'html-loader'
            },
            {
                test: /\.(jsx|js|mjs)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(jsx|js|mjs)$/,
                exclude: /node_modules/,
                use: "eslint-loader"
            },
            {
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test:/(\.scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:["file-loader"]
            }
        ]
    }
}