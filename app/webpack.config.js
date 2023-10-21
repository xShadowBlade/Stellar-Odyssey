const path = require('path');
// in case you run into any typescript error when configuring `devServer`
require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/index.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Output bundle file name
  },
  resolve: {
    extensions: ['css', '...'],
  },
  watch: true,
  watchOptions: {
    ignored: '**/node_modules',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel for .js and .jsx files
        },
      },
      // {
      //   test: /\.(ts|tsx)$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.css$/i,
        use: ['css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Use this HTML file as a template
    }),
  ],
};

module.exports = config;
