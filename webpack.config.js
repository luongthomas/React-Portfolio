var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  devtool: 'source-map', // allows the console to map to the actual file instead of the bundle
  entry: [
    './app/index.js',
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react',
      },
      {
        test: /\.css$/, loader: 'style-loader!css-loader', // possible to load cssfiles like modules
      },
    ],
  },
  plugins: [HtmlWebpackPluginConfig],

};
