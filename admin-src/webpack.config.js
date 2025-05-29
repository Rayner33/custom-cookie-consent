const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, '../assets/js/admin-dist'),
        filename: 'admin-app.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm-bundler.js'
        },
        extensions: ['.js', '.vue']
    }
};