const client = require('prom-client');

// Collect default Node.js metrics (CPU, memory, etc.)
client.collectDefaultMetrics();

// Custom metrics
const loginCounter = new client.Counter({
  name: 'app_login_total',
  help: 'Total login attempts'
});

const activeUsersGauge = new client.Gauge({
  name: 'app_active_users',
  help: 'Currently active users'
});

module.exports = {
  loginCounter,
  activeUsersGauge,
  metricsEndpoint: async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  }
};
