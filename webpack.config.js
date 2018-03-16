/**
 * Created by Yeong Kim on 11/21/16.
 */

var debug = process.env.NODE_ENV !== 'production'
var webpack = require('webpack');

module.exports = {
    context: __dirname + '/src',
    devtool: debug ? 'inline-sourcemap' : null,
    entry: './index.js',
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'env'],
                plugins: ['transform-class-properties', 'transform-decorators-legacy']
            }
        }]
    },
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: false
        })
    ]
};