const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { clear } = require('console')
const { type } = require('os')

module.exports = {
    entry:{
        main:'./src/index.js'
    },
    output:{
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename:'images/[hash][ext][query]'
    },
    plugins:[
        new HTMLWebpackPlugin({
            title: 'Weather App',
            template: './src/index.html',
            meta:{
                description: 'Weather app with responsive layout from the odin project made by FadilMs18',
                author: 'FadilMs18'
            },
            inject: 'body'
        }),

    ],
    module:{
        rules:[
            {
                test: /\.css$/i,
                use:['style-loader', 'css-loader']
            },
            {
                test:/\.html$/i,
                use:['html-loader'],
            },
            {
                test:/\.(jpg|gif|png|jpeg|svg)$/i,
                type:'asset/resource',
            },
            {
                test:/\.(?:js|mjs|cjs)$/i,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            ['@babel/preset-env']
                        ]
                    }
                }
            }
        ]
    }
}