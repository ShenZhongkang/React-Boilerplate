/* eslint-disable no-console */
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const chalk = require('chalk');
const logger = require('../logger');

// Proxy middleware
const addProxyMiddlewares = (app, proxyPath) => {
  let proxyConfig = {};
  if (fs.existsSync(proxyPath)) {
    try {
      proxyConfig = JSON.parse(fs.readFileSync(proxyPath, 'utf-8'));
    } catch (error) {
      logger.error(`parse ./proxy.json: ${error.message}`);
    }
  }

  try {
    const servicesKeys = Object.keys(proxyConfig);
    console.log('proxy config:');
    console.log(JSON.stringify(proxyConfig, 0, 4));
    servicesKeys.forEach(key => {
      const service = proxyConfig[key];
      const { api } = service;
      const logLevel = service.logLevel || 'info';
      const Proxy = createProxyMiddleware({
        target: api,
        logLevel,
        changeOrigin: true,
      });
      service.endpoints.forEach(endpoint => {
        app.all(endpoint, (req, res, next) => {
          console.log(
            `${chalk.bold('->')}: ${chalk.bold(req.url)} to ${chalk.gray(api)}`,
          );
          return Proxy(req, res, next);
        });
      });
      logger.proxyReversed(api, service.endpoints);
    });
  } catch (error) {
    logger.error(`proxy config error: ${error.message}`);
  }
};

module.exports = (app, options) => {
  addProxyMiddlewares(app, options);
  return app;
};