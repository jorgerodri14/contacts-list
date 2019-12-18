const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../webpack-react/dist'),
        filename: 'js/[name].js'
    },
    devServer: {
        port: 3000
    },
    module: {
        rules:[
            {
                test: /\.(js|jsx)$/,
                use : [ 'babel-loader' ],
                exclude: /node_modules/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css'
        }),
        new dotenv()
    ],
    resolve: {
        alias: {        
            'react-router-dom': path.resolve('./node_modules/react-router-dom')
        }
    }
}