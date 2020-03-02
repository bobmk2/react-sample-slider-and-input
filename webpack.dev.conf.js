const path = require('path');
const webpack = require('webpack');
const ForkTsChecker = require('fork-ts-checker-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: [path.join(__dirname, 'dest'), path.join(__dirname, 'static')],
    port: 3000,
    inline: true,
    watchContentBase: true,
    open: true,
    openPage: 'index.html',
    historyApiFallback: {
      index: '/index.html',
      disableDotRule: true
    },
    watchOptions: {
      aggregateTimeout: 1500
    },
    proxy: [
      {
        context: ['/dest'],
        target: 'http://localhost:3000',
        pathRewrite: { '^/dest': '' }
      }
    ]
  },
  target: 'web',
  mode: 'development',
  entry: {
    app: [path.resolve(__dirname, './src/index.tsx')]
  },
  devtool: 'cheap-module-eval-source-map',
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx']
  },
  output: {
    path: path.resolve(__dirname, './dest'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        APP_VERSION: JSON.stringify(`${process.env.npm_package_version} [dev]`)
      }
    }),
    new ForkTsChecker()
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: false,
              emitErrors: true,
              enforce: 'pre'
            }
          }
        ]
      }
    ]
  }
};
