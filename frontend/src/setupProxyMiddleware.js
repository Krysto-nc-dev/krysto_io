const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://krystotest-erp.square.nc',
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api': '/api' },
      onProxyReq: (proxyReq) => {
        // Ajoutez la clé API directement dans l'en-tête
        proxyReq.setHeader('DOLAPIKEY', 'eqhTZrONIar69OQ16r3I0861z3BtOsRe');
      },
    })
  );
};
