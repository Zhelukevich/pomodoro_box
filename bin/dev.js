const webpack = require('webpack');
const [webpackClientConfig, webpackServerConfig] = require('../webpack.config')
const nodemone = require('nodemon')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');

const hmrServer = express();
const clientCompiler = webpack(webpackClientConfig);

hmrServer.use(webpackDevMiddleware(clientCompiler, {
  publicPath: webpackClientConfig.output.publicPath,
  serverSideRender: true,
  writeToDisk: true,
  stats: 'errors-only',
}));

hmrServer.use(webpackHotMiddleware(clientCompiler, {
  path: '/static/__webpack_hmr',
}));

hmrServer.listen(3001, () => {
  console.log('Hmr Server successfully started');
});

const compiler = webpack(webpackServerConfig)

compiler.run((err) => {
  if (err) {
    console.log('Compilation faild:', err)
  }
  compiler.watch({}, (err) => {
    if (err) {
      console.log('Compilation faild:', err)
    }
    console.log('Compilation was successfully')
  });

  nodemone({
    script: path.resolve(__dirname, '../dist/server/server.js'),
    watch: [
      path.resolve(__dirname, '../dist/server'),
      path.resolve(__dirname, '../dist/client'),
    ]
  })
})