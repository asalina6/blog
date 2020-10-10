const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

process.env.NODE_ENV = "development"; //important for babel to know we're in dev mode
process.env.BABEL_ENV = "development";

const browserConfig = {
    mode: 'development',
    target: 'web', //could use node instead
    devtool: 'cheap-module-source-map',
    entry: path.resolve(__dirname,'./src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: 'bundle-front.js',
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
        https: false,
        port: 3000
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.API_URL": JSON.stringify("http://localhost:3001")  //now webpack will replace process.env.API_URL wiht what we specified here.
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            filename: "index.html",
            inject: "body",
            favicon: "./src/favicon.ico"
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
                //source map may not work with singleton
                test: /(\.css)$/,
                use: [
                    {
                        loader: "style-loader",
                        options: { injectType: 'singletonStyleTag'},
                    },
                    "css-loader",
                ]
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

const serverConfig = {
    mode: 'development',
    target: 'node', //could use node instead of browser
    entry: path.resolve(__dirname,'./src/server.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: 'bundle-back.js',
        libraryTarget: 'commonjs'
    },
    externals: [nodeExternals()],
}


module.exports = [browserConfig, serverConfig];