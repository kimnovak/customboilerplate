const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            exclude: [/node_modules/, /public/],
                        },
                    },
                ],
            },
            {
                test: /\.s?css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        alias: {
            '@common': path.resolve(__dirname, 'src/common/'),
        },
        extensions: ['js', '.jsx', '.json', '...'],
    },
    optimization: {
        minimize: true,
        usedExports: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
        hot: true,
        open: true,
        onListening(devServer) {
            if (!devServer) {
                throw new Error('webpack-dev-server is not defined');
            }

            const { port } = devServer.server.address();
            console.log('Listening on port:', port);
        },
    },
};
