const express = require('express');
const path = require('path');
const applyExpressMiddleware = require('./middleware');
const routes = require('./routes');

const app = express();

applyExpressMiddleware(app);
app.use('/api', routes);

// return our react app for all non-API routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'client/index.html'));
});

module.exports = app;
