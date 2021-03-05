const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    resolveLoader: {
        modules: ['node_modules', './loaders']
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use: [{
                    loader: 'replaceLoader',
                    options: {
                        name: '李钟硕'
                    }
                },{
                    loader: 'replaceLoaderAsync',
                    options: {
                        name: '我爱你'
                    }
                }]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
}