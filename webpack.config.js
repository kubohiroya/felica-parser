const path = require("path");
const webpack = require('webpack');

const plugins = [
  new webpack.optimize.ModuleConcatenationPlugin(),
];
module.exports = {
  entry: './src/index.ts',
  plugins,
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        options: {
          configFile: './tslint.json',
          typeCheck: true,
        },
        exclude: /(node_modules)/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  stats: {
    colors: true,
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
};
