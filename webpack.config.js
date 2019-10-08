const path = require('path');


const config = {
  devtool: "eval",
  mode: 'development',
  entry: './src/main/client/src/index.js',
  output: {
    path: path.resolve(__dirname, "./src/main/webapp"),
    filename: 'simpledoc.bundle.js'
  },
  devServer: {
    publicPath: '/src/main/webapp/',
    contentBase: path.resolve(__dirname, "./src/main/webapp/"),
    watchContentBase: true,
    compress: true,
    port: 3333
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
};

module.exports = config;
