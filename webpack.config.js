const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { NODE_ENV, PUBLIC_PATH, ANALYZER } = process.env;
const isProduction = NODE_ENV === 'production';
const isAnalyzer = isProduction && ANALYZER;
const publicPath = isProduction ? '/' + (PUBLIC_PATH ? PUBLIC_PATH + '/' : '') : '/';

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  stats: { children: false },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: publicPath,
    filename: 'js/bundle.js?[hash]'
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [ path.resolve(__dirname, 'node_modules') ]
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [ '@babel/env', { targets: { browsers: [ 'last 2 versions' ] }, useBuiltIns: 'usage', corejs: 3, modules: false } ]
          ],
          plugins: [
            [ '@babel/transform-runtime', { corejs: 3 } ]
          ]
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug3-loader'
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          outputPath: 'fonts',
          esModule: false
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /(fa-).*\.(svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          outputPath: 'img',
          esModule: false
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Layer9 GmbH - Software-Entwicklung & IT-Beratung',
      template: "./src/index.pug",
      filename: "./index.html",
      favicon: './src/images/favicon.png',
      inject: true,
      scriptLoading: 'defer'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/bundle.css?[hash]'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['*', '.js', '.json'],
    fallback: { "url": false }
  },
  devtool: 'eval-source-map'
};

if (isProduction) {
  module.exports.devtool = 'source-map';
  module.exports.mode = 'production';
}

if (publicPath !== '/') {
  module.exports.devtool = 'nosources-source-map';
}

if (isAnalyzer) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

  module.exports.plugins.push(new BundleAnalyzerPlugin());
}
