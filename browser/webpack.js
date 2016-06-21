var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: "./app.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        extensions: ['', '.js']
    },
    node: {
        fs: "empty"
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'es2015', 'stage-0']
            }
        }]
    }
};