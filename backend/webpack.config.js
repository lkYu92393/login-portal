const webpack = require('webpack');
const path = require('path');

const config = {
    target: 'node',
    entry: './src/bin/www',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            config: path.resolve(__dirname, 'src/config/'),
            lib: path.resolve(__dirname, 'src/lib/'),
            services: path.resolve(__dirname, 'src/services/'),
        },
    },
    optimization: {
        minimize: true,
        // minimizer: [new UglifyJsPlugin({
        //     include: /\.min\.js$/
        // })]
    },
    externals: {
        sqlite3: 'commonjs sqlite3',
    },
};

module.exports = config;