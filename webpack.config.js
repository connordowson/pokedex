var path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');


module.exports = {

    entry: "./src/js/index.js",

    output: {

        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'

    },

    module: {

        rules: [
            
            {

                test: /\.scss$/,

                use: [{

                    loader: "style-loader" // creates style nodes from JS strings
                },

                {
                    loader: "css-loader" // translates CSS into CommonJS
                },

                {
                    loader: "sass-loader" // compiles Sass to CSS
                }]

            },

            {

                test: /\.js$/,

                exclude: /(node_modules)/,

                use: {

                    loader: "babel-loader",

                    options: {

                        presets: ['es2015', 'react', 'stage-2']
                        
                    }

                }

            },


            {
                test: /\.(gif|png|jpe?g)$/i,

                use: {

                    loader: "file-loader",

                    options: {

                        name: "./assets/[name].[ext]",
                        publicPath: 'assets/'

                    }
                }

            }

        ]
    },

    plugins: [

        new CopyWebpackPlugin([

            {from: "./src/assets/", to: "./assets/"}

        ])

    ]

}