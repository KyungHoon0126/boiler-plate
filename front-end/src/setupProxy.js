// const proxy = require('http-proxy-middleware');

// proxy.createProxyMiddleware({

// })

// module.exports = function(app) {
//   app.use(
//     '/api',
//     proxy({
//       target: 'http://localhost:3000',
//       changeOrigin: true,  
//     })
//   );
// };


const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};