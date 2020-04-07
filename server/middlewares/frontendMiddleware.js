/* eslint-disable global-require */
const path = require('path');

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    const addProdMiddlewares = require('./addProdMiddlewares');
    addProdMiddlewares(app, options);
  } else {
    const webpackConfig = require('../../config/webpack/webpack.config.dev');
    const addDevMiddlewares = require('./addDevMiddlewares');
    const addProxyMiddlewares = require('./addProxyMiddlewares');
    const proxyPath = path.resolve(process.cwd(), 'proxy.json');
    addProxyMiddlewares(app, proxyPath);
    addDevMiddlewares(app, webpackConfig);
  }

  return app;
};
