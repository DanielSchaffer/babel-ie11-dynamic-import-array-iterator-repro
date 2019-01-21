const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

  output: {
    publicPath: '/',
    sourceMapFilename: '[file].map',
    path: path.resolve(__dirname, 'out'),
  },

  devtool: 'source-map',

  resolve: {
    // extensions: ['.ts', '.js'],

    // note that es2015 comes first, which allows using esm2015 outputs from Angular Package Format 5 packages
    // mainFields: [
    //   'es2015',
    //   'module',
    //   'browser',
    //   'main'
    // ],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                targets: {
                  browsers: [
                    '> 1%',
                    'last 2 versions',
                    'Firefox ESR',
                    'IE 11',
                  ],
                },
                modules: false,
              }]
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
            ]
          }
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(jpe?g|png|gif)/,
        use: 'file-loader',
      },
      {
        test: /\.pug$/,
        use: [
          'raw-loader',
          {
            loader: 'pug-html-loader',
            options: {
              data: {
                exampleName: 'ie11-dynamic-import-array-iterator',
              },
            }
          },
        ],
      }
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  mode: 'development',

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      cache: false,
      inject: 'body',
      template: './index.pug',
    }),
  ],

}
