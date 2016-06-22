var webpack = require('webpack');
module.exports = {
    entry: __dirname+"/app.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    devtool: 'cheap-module-eval-source-map',
    node: {
        fs: "empty"
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'stage-0']
            }
        }]
    },
    plugins: [new webpack.optimize.UglifyJsPlugin()]
};
