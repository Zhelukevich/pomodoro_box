const path = require('path');
const nodeExternals = require('webpack-node-externals');

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  target: 'node',

  mode: NODE_ENV ? NODE_ENV : 'development',

  entry: path.resolve(__dirname, '../src/server/server.js'),

  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: 'server.js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },

  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['ts-loader']
      }, {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
              onlyLocals: true,
            }
          },
          'sass-loader',
        ],
      }
    ]
  },

  optimization: {
    minimize: false
  }
};