const cssLoader = require('css-loader');
const styleLoader = require('style-loader');

module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                {
                    loader: styleLoader.loader,
                },
                {
                    loader: cssLoader.loader,
                },
            ],
        },
    ],
},

