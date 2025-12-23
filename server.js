const express = require('express');
const promBundle = require('express-prom-bundle');
const { metricsEndpoint } = require('./metrics');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

// Auto HTTP metrics middleware
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  promClient: {
    collectDefaultMetrics: {}
  }
});

app.use(metricsMiddleware);

// Expose /metrics endpoint
app.get('/metrics', metricsEndpoint);

// Routes
app.use('/api', authRoutes);

app.get('/products', (req, res) => {
  res.json({ items: [] });
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
