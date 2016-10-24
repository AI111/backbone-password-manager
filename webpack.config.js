var webpack = require('webpack');
var entry ='./src/app/main.js';
    // vendor: [
    //     'backbone',
    //     'backbone.marionette',
    //     'jquery',
    //     'bootstrap',
    //     "tether",
    //     'lodash'
    // ]
// }
output = {
    path: __dirname,
    filename: 'main.js'
},
    uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
        compressor: {
            screw_ie8: true,
            warnings: false
        },
        output: {
            comments: false
        }
    });

module.exports.development = {
    debug : true,
    devtool : 'eval',
    entry: entry,
    output: output,
    module : {
        loaders : [
            { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.hbs$/, loader: 'handlebars-loader' }
        ]
    }
    ,
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.Tether": 'tether'
        })
    ]
};

module.exports.production = {
    debug: false,
    entry: entry,
    output: output,
    module : {
        loaders : [
            { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.hbs$/, loader: 'handlebars-loader' }
        ]
    },
    plugins: [
        uglifyJsPlugin
    ]
};
