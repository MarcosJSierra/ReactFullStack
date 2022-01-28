const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== 'production';
const mode = isDevelopment ? 'development' : 'production';
const devPlugins = !isDevelopment ? [] : [ new ReactRefreshWebpackPlugin() ]

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    mode: "development",
    devServer: {
        port: 5000,
        open: true,
        hot: true,
        historyApiFallback: true
    },
    module:{
        rules: [
            {
                use: "babel-loader",
                test: /.js$/,
                exclude: /node_modules/
            },
            {
                use: [MiniCssExtractPlugin.loader, "css-loader"],
                test: /.css$/ 
            },
            {
                type: "asset",
                test: /.(png|svg|jpg|jpge|gif)$/i
            }
        ]
    },
    plugins: [
        ...devPlugins,
        new CleanWebpackPlugin,
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ]
}