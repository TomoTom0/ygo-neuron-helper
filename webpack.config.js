const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    background: './src/background/index.ts',
    content: './src/content/index.ts',
    popup: './src/popup/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
          from: 'public/manifest.json',
          to: 'manifest.json'
        },
        {
          from: 'public/icons',
          to: 'icons',
          noErrorOnMissing: true
        }
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/popup/popup.html',
      filename: 'popup.html',
      chunks: ['popup'],
    }),
  ],
  optimization: {
    splitChunks: false,
  },
};
