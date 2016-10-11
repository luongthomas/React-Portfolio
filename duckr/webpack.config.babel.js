import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body',
})

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist'),
}

// npm run production, LAUNCH_COMMAND will equal production
const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

// the webpack method to put React into 'production' mode
const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

const base = {
  entry: [
    PATHS.app,
  ],
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      // to use css modules
      { test: /\.css$/, loader: 'style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]' },
    ],
  },

  resolve: {
    // now everytime we import, we'll start from the ./app
    root: path.resolve('./app')
  }
}
// now everytime we import, we'll start from the ./app

//
// module.exports = {
//   entry: [
//     PATHS.app,
//   ],
//   output: {
//     path: PATHS.build,
//     filename: 'index_bundle.js',
//   },
//   module: {
//     loaders: [
//       { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
//       { test: /\.css$/, loader: 'style-loader!css-loader' },
//     ],
//   },
//   devtool: 'cheap-module-source-map',
//   plugins: [HtmlWebpackPluginConfig, productionPlugin],
// }

// HotModuleReplacementPlugin allows us to keep state while changing component
const developmentConfig = {
  // devtool: 'cheap-module-eval-source-map',  // works, but kills performance
  // https://github.com/webpack/webpack/issues/2145
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin(), new webpack.SourceMapDevToolPlugin(),]
}

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HtmlWebpackPluginConfig, productionPlugin,]
}


export default Object.assign({}, base,
  isProduction === true ? productionConfig : developmentConfig
)
