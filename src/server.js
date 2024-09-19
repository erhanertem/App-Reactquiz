const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, '../data/questions.json'));
const middlewares = jsonServer.defaults();

// Add custom middleware for CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// Use default router
server.use(router);
server.listen(8000, () => {
  console.log('JSON Server is running');
});
